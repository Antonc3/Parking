const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
    qrIdentifier: {
        type: String,
        default: '',
    },
    qrIdentifierInUse: {
        type: Boolean,
        default: false,
    },
    qrScanInTime: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
