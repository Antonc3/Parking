const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    email: String,
    qrIdentifier: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
