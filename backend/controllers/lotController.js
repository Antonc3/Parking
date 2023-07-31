const User = require('../models/User');
const Lot = require('../models/Lot');
const SingleLot = require('../models/SingleLot');
const Ticket = require('../models/Ticket');
const socket = require('../socket');
const config = require('../config');
const stripe = require('stripe')(config.stripe.secret_key);

const createSingleLot = async (req,res) => {
    try{
        const curLot = await Lot.findById(req.user);
        if(!curLot) res.status(400).json({error: "Could not find current Lot"});
        const newSingleLot = new SingleLot({
            name: req.body.name,
            hourlyRate: req.body.hourlyRate,
            lot: curLot._id,
        })
        await newSingleLot.save();
        curLot.singleLots.push(newSingleLot._id);
        await curLot.save();
        return res.status(200).json({message: "Saved a new single lot"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error});
    }
}

const createTicket = async (req,res) => {
    //req.body.singleLot is the parking lot
    //req.body.qrData is the car
    try{
        const curSingleLot = await SingleLot.findById(req.body.singleLot);
        if(!curSingleLot){
            res.status(400).json({ error: "Could not find current single Lot" });
        }
        const foundUser = await User.find({qrIdentifier: req.body.qrData});
        if(!foundUser){
            res.status(400).json({error: "There is no user that matches the following qrData"});
        }
        if(curSingleLot.lot != req.user){
            res.status(400).json({error: "The single lot does not belong to the current lot"});
        }
        var io = socket.getIoInstance();
        io.to(foundUser.socketId).emit("createTicketConfirmation ", {
            lotName: curSingleLot.name,
            singleLotId: curSingleLot._id,
        });
        return res.status(200).json({message: "Successfully sent ticket confirmation"})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error});
    }
}

const endTicket = async (req,res) => {
    try{
        const curSingleLot = await SingleLot.findById(req.body.singleLot);
        if(!curSingleLot){
            res.status(400).json({ error: "Could not find current single Lot" });
        }
        const foundUser = await User.find({qrIdentifier: req.body.qrData});
        if(!foundUser){
            res.status(400).json({error: "There is no user that matches the following qrData"});
        }
        if(curSingleLot.lot != req.user){
            res.status(400).json({error: "The single lot does not belong to the current lot"});
        }
        const curLot = await Lot.findById(req.user);
        if(!curLot){
            res.status(400).json({error: "There is no lot that matches the following qrData"});
        }
        const currentTicketId = foundUser.currentTicket;
        const currentTicket = await Ticket.findById(currentTicketId);
        if(!currentTicket){
            res.status(400).json({error: "There is no ticket associated with the current user"});
        }
        // create paymentIntent
        const currentDate = new Date();
        currentTicket.timeExited = currentDate;
        const startDate = currentTicket.timeEntered;
        //calculate amount due
        const diff = currentDate-startDate;
        const hours = diff/1000/60/60;
        const cost = Math.floor(curSingleLot.hourlyRate*hours*100)/100;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: cost,
            currency: 'usd',
            customer: foundUser.stripeId,
            confirm: true,
            payment_method: foundUser.payment.activePaymentId,
            metadata: {
                ticketId: currentTicketId
            }
        })
        currentTicket.stripe.paymentIntentId = paymentIntent.id;
        await currentTicket.save();
        curSingleLot.currentTickets.splice(curSingleLot.indexOf(currentTicketId),1);
        await curSingleLot.save();
        //remove currentTicket
        foundUser.currentTicket = null;
        await foundUser.save();
        // change this to steal money from lot
        curLot.amountOwed = curLot.amountOwed + cost;
        await curLot.save();
        return res.status(200).json({message: "Successfully ended parking session!"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error});
    }
}

module.exports = {
    createSingleLot,
    createTicket,
    endTicket,

}

