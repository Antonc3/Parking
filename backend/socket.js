const socketIo = require('socket.io');
const User = require('./models/User')
const Ticket = require('./models/Ticket')
const SingleLot = require('./models/SingleLot')
const authController = require('./controllers/authController')
let io;

const setupSocket = (server) => {
    io = socketIo(server);

    // Socket.io setup
    io.on('connection', (socket) => {
        const userToken = socket.handshake.auth.token;
        const userId = authController.decryptToken(userToken);
        User.findByIdAndUpdate(userId, {socketId: socket.id}, (err,user) => {
            if(err){
                console.error('Error updating socketid: ', err);
            }
            else{
                console.log('SocketId updated for user: ', user.username);
            }
        });
        socket.on('confirmTicket', async (ticketData) => {
            const startDate = new Date();
            const foundUser = User.findById(userId);
            const curSingleLot = SingleLot.findById(ticketData.singleLotId);
            const newTicket = new Ticket({
                timeEntered: startDate,
                user: foundUser._id,
                singleLot: req.body.singleLot,
            })
            await newTicket.save();
            foundUser.currentTicket = newTicket._id;
            curSingleLot.currentTickets.push(newTicket); 
            await curSingleLot.save();
            await foundUser.save();
        })
    });
};

const getIoInstance = () => {
    return io;
};

module.exports = { setupSocket, getIoInstance };