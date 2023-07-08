const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    qrCodeUrl: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
