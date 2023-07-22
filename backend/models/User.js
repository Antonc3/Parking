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
    currentTicket: {
        type: mongoose.Schema.Types.ObjectId,
        reference: 'Ticket',
    },
    payment: {
        stripeCustomerId: {
            type: String,
            required: true,
        },
        activePaymentId: {
            type: String,
            default: '',
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
