const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    timeEntered: {
        type: Number,
        required: true,
        immutable: true,
    },
    timeExtited: {
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