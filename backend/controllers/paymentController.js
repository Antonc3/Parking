const config = require('../config');
const stripe = require('stripe')(config.stripe.secret_key);
const User = require('../models/User')
const Lot = require('../models/Lot');
const Ticket = require('../models/Ticket');
const SingleLot = require('../models/SingleLot');

const saveCard = async (req, res) => {
    const  { paymentMethodId } = req.body;
    try {
        const user = await User.findById(req.user);
        const paymentMethod = await stripe.paymentMethods.attach( paymentMethodId,
            {
                customer: user.payment.stripeCustomerId,
            }
        )
        if(!user.payment || !user.payment.activePaymentId) user.payment.activePaymentId = paymentMethodId;
        user.save();
        res.status(200).json({message: 'Successfully saved card'});
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Failed to save card' });
    }
}

const getPaymentMethods = async (req,res) => {
    try{
        const user = await User.findById(req.user);
        const customerId = user.payment.stripeCustomerId;
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
        })
        return res.status(200).json({
            paymentMethods: paymentMethods.data,
            activePaymentId: user.payment.activePaymentId,
        })
    } catch(error){
        console.log('Error:',error);
        res.status(400).json({error: 'Could not retrieve payment methods'});
    }
}
const setActivePaymentMethod = async (req,res) => {
    try{
        const user = await User.findById(req.user);
        const customerId = user.payment.stripeCustomerId;
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
        })
        var foundPaymentId = false;
        paymentMethods.data.forEach( (paymentMethod) =>{
            if(paymentMethod.id == req.body.activePaymentId) foundPaymentId = true;
        })
        if(!foundPaymentId){
            return res.status(400).json({error: 'Given Payment Method not found inside of users active payment methods'})
        }
        user.payment.activePaymentId= req.body.activePaymentId;
        user.save();
        res.status(200).json({
            message: "successfully set active payment"
        })
    } catch(error){
        console.log('Error:',error);
        res.status(400).json({error: 'Could not set given payment method as active payment method'});
    }
}

const stripeWebhook = async (req,res) => {
    const event = req.body;
    const endpointSecret = config.stripe.webhookSecret;
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return response.sendStatus(400);
        }
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            const curTicketId = paymentIntent.metadata.ticketId;
            const curTicket = await Ticket.findById(curTicketId);
            if (!curTicket) {
                return res.status(400).json({ error: "BAD TICKET" });
            }
            const curSingleLot = await SingleLot.findById(curTicket.singleLot);
            if (!curSingleLot) {
                return res.status(400).json({ error: "BAD SingleLot" });
            }
            const curLot = await Lot.findById(curSingleLot.lot);
            if (!curLot) {
                return res.status(400).json({ error: "BAD Lot" });
            }
            const amount = paymentIntent.amount;
            const transfer = await stripe.transfers.create({
                amount: amount,
                currency: 'usd',
                destination: curLot.stripeId,
            });
            curTicket.stripe.transferId = transfer.id;
        default:
            console.log("unhandled event type")
    }
    res.status(200).send('Received');
}

const getTicketHistory = async (req,res) => {
    try{
        const userId = req.user;
        const foundUser = await User.findById(userId);
        if(!foundUser){
            res.status(400).json({error: "User not foudn"});
        }
        const foundTickets = await Ticket.find({user: userId});
        console.log(foundTickets);
        var ticketList = [];
        var activeTicket = null;
        for(const tick of foundTickets){
            const foundSingleLot = await SingleLot.findById(tick.singleLot);
            var curTicketData = {
                id: tick._id, 
                lotName: foundSingleLot.name,
                lotLocation: foundSingleLot.location,
                dateEntered: new Date(tick.timeEntered).toString(),
                amount: tick.amountPaid,
            }
            if(tick.timeExited==-1){
                activeTicket = curTicketData;
                return;
            }
            curTicketData.dateExited = new Date(tick.timeExited).toString();
            if(tick.amountPaid > 0){
                const paymentIntent = await stripe.paymentIntents.retrieve(tick.stripe.paymentIntentId);
                curTicketData.paymentMethod = {
                    last4: paymentIntent.payment_method.card.last4,
                    brand: paymentIntent.payment_method.brand
                }
            }
            console.log("pushing curTicketData: ",curTicketData);
            ticketList.push(curTicketData)
        }
        console.log("ticketList: ",ticketList);
        return res.status(200).json({activeTicket, tickets: ticketList});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    saveCard,
    getPaymentMethods,
    setActivePaymentMethod,
    stripeWebhook,
    getTicketHistory,
}
