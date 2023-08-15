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
        if(!user.activePaymentId) user.activePaymentId = paymentMethodId;
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
        console.log(paymentMethods);
        console.log("activePaymentId: ",req.body.activePaymentId);
        paymentMethods.data.forEach( (paymentMethod) =>{
            if(paymentMethod.id == req.body.activePaymentId) foundPaymentId = true;
        })
        console.log("found payment id: ", foundPaymentId);
        if(!foundPaymentId){
            return res.status(400).json({error: 'Given Payment Method not found inside of users active payment methods'})
        }
        user.activePaymentId= req.body.activePaymentId;
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
    try {
        const signature = req.headers['stripe-signature'];
        event = stripe.webhooks.constructEvent(req.rawBody, signature, config.stripe_webhook_secret);
    } catch (error) {
        console.error('Webhook signature verification failed:', error.message);
        return res.status(400).send('Webhook Error: Invalid signature');
    }

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        console.log('PaymentIntent succeeded:', paymentIntent.id);
        const curTicketId = paymentIntent.metadata.ticketId;
        const curTicket = Ticket.findById(curTicketId);
        if(!curTicket){
            return res.status(400).json({error: "BAD TICKET"});
        }
        const curSingleLot = SingleLot.findById(curTicket.singleLot);
        if(!curSingleLot){
            return res.status(400).json({error: "BAD SingleLot"});
        }
        const curLot = Lot.findById(curSingleLot.lot);
        if(!curLot){
            return res.status(400).json({error: "BAD Lot"});
        }
        const amount = paymentIntent.amount;
        const transfer = await stripe.transfers.create({
            amount: amount,
            currency: 'usd',
            destination: curLot.stripeId,
        });
        curTicket.stripe.transferId = transfer.id;
    }
    res.status(200).send('Received');
}

module.exports = {
    saveCard,
    getPaymentMethods,
    setActivePaymentMethod,
    stripeWebhook,
}
