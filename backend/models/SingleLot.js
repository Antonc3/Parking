const Lot = require('./Lot')
const mongoose = require('mongoose');

const SingleLotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    hourlyRate: {
        type: Number,
        required: true,
    },
    minutesBeforePay: {
        type: Number,
        default: 15,
    },
    lot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lot',
        required: true,
    },
    currentTickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
    }]
})

const SingleLot = mongoose.model('SingleLot',SingleLotSchema);

module.exports = SingleLot;