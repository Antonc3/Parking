const socketIo = require('socket.io');
const User = require('./models/User')
const Ticket = require('./models/Ticket')
const SingleLot = require('./models/SingleLot')
const authController = require('./controllers/authController')
let io;

const setupSocket = (server) => {
    io = socketIo(server);
    console.log("Creating Socket!");
    // Socket.io setup
    io.on('connection', async (socket) => {
        var userId;
        try{
            const userToken = socket.handshake.auth.token;
            userId = authController.decryptToken(userToken).userId;
            await User.findByIdAndUpdate(userId, { socketId: socket.id });
            const foundUser = await User.findById(userId);
        }
        catch(error){
            console.log("SOCKET DISCONNECTING")
            socket.disconnect();
            return;
        }
        socket.on('confirmTicket', async (ticketData) => {
            console.log("TICKET HAS BEEN CONFIMRED")
            console.log("ticketData: ",ticketData);
            console.log("userId:",userId)
            const startDate = new Date();
            const foundUser = await User.findById(userId);
            const curSingleLot = await SingleLot.findById(ticketData.singleLotId);
            const newTicket = new Ticket({
                timeEntered: startDate,
                user: userId,
                singleLot: ticketData.singleLotId,
            })
            await newTicket.save();
            foundUser.currentTicket = newTicket._id;
            curSingleLot.currentTickets.push(newTicket._id); 
            await curSingleLot.save();
            await foundUser.save();
            io.to(foundUser.socketId).emit('ticketCreated');
            console.log("emmited ticketCreated")
        })
    });
};

const getIoInstance = () => {
    return io;
};

module.exports = { setupSocket, getIoInstance };