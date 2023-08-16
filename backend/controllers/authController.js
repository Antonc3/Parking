const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const stringHelper = require('../helper/stringHelper.js');
const config = require('../config.js');
const stripe = require('stripe')(config.stripe.secret_key);

const createUser = async (req, res) => {
    const { username, password, phone, email } = req.body;

    // Check if the username already exists
    var existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ field: 'username', error: 'Username already exists' });
    }
    existingUser = await User.findOne({ phone });
    if (existingUser) {
        return res.status(409).json({ field: 'phone', error: 'Phone number already in use' });
    }

    existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ field: 'email', error: 'Email already in use' });
    }
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const uniqueIdentifier = await stringHelper.genUniqueIdentifier(config.identifierLength);
        const stripeCustomer = await stripe.customers.create({
            email,
            phone,
            name: username,
        });
        // Create a new user
        const newUser = new User({
            username: username,
            password: hashedPassword,
            phone: phone,
            email: email,
            qrIdentifier: uniqueIdentifier,
            payment: {
                stripeCustomerId: stripeCustomer.id
            }
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(req.user);

        // If the user is not found, return an error response
        if (!user) {
            return res.status(404).json({ field: 'username', error: 'User not found' });
        }

        // Compare the old password with the stored password
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        // If the old password is incorrect, return an error response
        if (!isPasswordCorrect) {
            return res.status(401).json({ field: 'password', error: 'Incorrect old password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    // Retrieve the username and password from the request body
    const { username, password } = req.body;

    // Find the user based on the username
    const user = await User.findOne({ username });

    // If user not found or password is incorrect, return an error response
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, config.secret_key);

    // Return the token in the response
    res.json({ token, username });
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
        req.user = decodedToken.userId;

        // Proceed to the next middleware or route
        next();
    });
}

const checkTokenValid = async (req,res) => {
    const userId = req.user;
    try{
        const foundUser = await User.findById(userId);
        if(!foundUser){
            return res.status(404).json({error: "token does not lead to a valid user"});
        }
        return res.status(200).json({message: "Token is valid!"});
    }
    catch(error){
        return res.status(400).json({error: "Internal server error"});
    }
}

    const decryptToken =  (token) => {
    if (!token) {
        return null;
    }

    // Verify the token
    try{
        const decodedToken = jwt.verify(token, config.secret_key);
        return decodedToken;
    }
    catch(error){
        throw error;
    }
}

module.exports = {
    createUser,
    login,
    authenticateToken,
    changePassword,
    decryptToken,
    checkTokenValid,
};

