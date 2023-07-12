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
        user.paymentMethodCount = user.paymentMethodCount + 1;
        user.save();
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
            activePaymentIndex: user.payment.activePaymentIndex,
        })
    } catch(error){
        console.log('Error:',error);
        res.status(400).json({error: 'Could not retrieve payment methods'});
    }
}
const setActivePaymentMethod = async (req,res) => {
    try{
        const user = await User.findById(req.user);
        user.payment.activePaymentIndex = req.activePaymentIndex;
        if(req.activePaymentIndex > user.payment.paymentMethodCount){
            return res.status(400).json({
                error: 'Payment index out of bounds'
            })
        }
        user.save();
        res.status(200).json({
            message: "successfully set active payment"
        })
    } catch(error){
        console.log('Error:',error);
        res.status(400).json({error: 'Could not retrieve payment methods'});
    }
}
module.exports = {
    saveCard,
    getPaymentMethods,
    setActivePaymentMethod,
}
