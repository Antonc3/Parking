const config = require('../config');
const stripe = requrie('stripe')(config.stripe.secret_key);
const User = require('../models/User')

const saveCard = async (req, res) => {
    const  { paymentMethodId } = req.body;
    try {
        const user = await User.findById(req.user);
        const paymentMethod = await stripe.paymentMethods.attach( paymentMethodId,
            {
                customer: user.payment.stripeCustomerId,
            }
        )
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
            paymentMethods,
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
        paymentMethods.forEach( (paymentMethod) =>{
            if(paymentMethod.id == req.body.activePaymentId) foundPaymentId = true;
        })
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
module.exports = {
    saveCard,
    getPaymentMethods,
    setActivePaymentMethod,
}
