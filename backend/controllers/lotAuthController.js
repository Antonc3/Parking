const Lot = require('../models/Lot');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config.js');
const stripe = require('stripe')(config.stripe.secret_key);

const createLot = async (req, res) => {
    const { name, password, email } = req.body;

    // Check if the username already exists
    var existingLot = await Lot.findOne({ name });
    if (existingLot) {
        return res.status(409).json({ field: 'name', error: 'Username already exists' });
    }
    existingLot = await User.findOne({ email });
    if (existingLot) {
        return res.status(409).json({ field: 'email', error: 'Phone number already in use' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const stripeAccount = await stripe.accounts.create({
            type: 'express',
            country: 'US',
            email,
            name,
        });
        // Create a new user
        const newLot = new Lot({
            name: name,
            password: hashedPassword,
            phone: phone,
            stripeId: stripeAccount.id,
        });

        // Save the user to the database
        await newLot.save();

        res.status(201).json({ message: 'Lot created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        // Find the user by ID
        const lot = await lot.findById(req.user);

        // If the user is not found, return an error response
        if (!lot) {
            return res.status(404).json({ field: 'username', error: 'User not found' });
        }

        // Compare the old password with the stored password
        const isPasswordCorrect = await bcrypt.compare(oldPassword, lot.password);

        // If the old password is incorrect, return an error response
        if (!isPasswordCorrect) {
            return res.status(401).json({ field: 'password', error: 'Incorrect old password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        lot.password = hashedPassword;
        await lot.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    // Retrieve the username and password from the request body
    const { email, password } = req.body;

    // Find the user based on the username
    const lot = await lot.findOne({ email });

    // If user not found or password is incorrect, return an error response
    if (!lot || !(await bcrypt.compare(password, lot.password))) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: lot._id }, config.secret_key);

    // Return the token in the response
    res.json({ token });
}

const authenticateToken = (req, res, next) => {
    // Retrieve the token from the request header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // If no token is provided, return an error response
    if (!token) {
        return res.status(401).json({ error: 'Token not found' });
    }

    // Verify the token
    jwt.verify(token, config.secret_key, (err, decodedToken) => {
        // If the token is invalid, return an error response
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        // Attach the decoded token payload to the request object
        req.user = decodedToken;

        // Proceed to the next middleware or route
        next();
    });
}

const genLoginLink = async (req, res) => {
    const user = req.user;
    try{
        const lot = Lot.findById(user);
        const loginLink = await Stripe.accounts.createLoginLink(
            lot.stripeId
        )
        return res.status(200).json({
            url: loginLink.url,
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
const genAccountLink = async (req,res) => {
    const user = req.user;
    try{
        const lot = Lot.findById(user);
        var type = 'account_onboarding';
        if(lot.verified){
            type = 'account_update';
        }
        const accountLink = await Stripe.accountLinks.create({
            account: lot.stripeId,
            refresh_url: config.stripe.onboarding_finish_url,
            return_url: config.stripe.onboarding_finish_url,
            type: 'account_onboarding',
        })
        return res.status(200).json({
            accountLink
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

module.exports = {
    createLot,
    changePassword,
    login,
    authenticateToken,
    genLoginLink,
    genAccountLink,
}