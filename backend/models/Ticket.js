const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    timeEntered: {
        type: Number,
        required: true,
        immutable: true,
    },
    timeExited: {
        type: Number,
        default: -1,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    singleLot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SingleLot',
        required: true,
    },
    amountPaid: {
        type: Number,
        default: 0,
    },
    stripe: {
        paymentIntentId:{
            type: String,
        },
        transferId: {
            type: String,
        }
    }
});

const Ticket = mongoose.model('Ticket',ticketSchema);

module.exports = Ticket;