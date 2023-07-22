const Lot = require('./Lot')
const mongoose = require('mongoose');

const SingleLotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    hourlyRate: {
        type: Number,
        required: true,
    },
    lot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lot',
        required: true,
    },
    curentTickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
    }]
})

const SingleLot = mongoose.model('SingleLot',SingleLotSchema);

module.exports = SingleLot;