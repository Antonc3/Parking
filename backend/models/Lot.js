const mongoose = require('mongoose');

const LotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    verified: {
        type: Boolean,
        default: false,
    },
    amountOwed: {
        type: Number,
        default: 0,
    },
    stripeId: {
        type: String,
        required: true,
    },
    singleLots: [{
        type: mongoose.Schema.Types.ObjectId,
        reference: 'SingleLot',
    }],
    
})

const Lot = mongoose.model('Lot',LotSchema);

module.exports = Lot;