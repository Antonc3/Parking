const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
        required: true,
    },
    password: {
        type: String,
        default: '',
        required: true,
    },
    phone: {
        type: String,
        default: '',
        required: true,
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
    payment: {
        stipeCustomerId: {
            type: String,
            required: true,
        },
        activePaymentIndex: {
            type: Number,
            default: 0,
        },
        paymentMethodCount: {
            type: Number,
            default: 0,
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
