const User = require('../models/User');
const Lot = require('../models/Lot');
const SingleLot = require('../models/SingleLot');
const Ticket = require('../models/Ticket');

const createSingleLot = async (req,res) => {
    try{
        const curLot = await Lot.findById(req.user);
        if(!curLot) res.status(400).json({error: "Could not find current Lot"});
        const newSingleLot = new SingleLot({
            name: req.body.name,
            hourlyRate: req.body.hourlyRate,
            lot: curLot._id,
        })
        await newSingleLot.save();
        curLot.singleLots.push(newSingleLot._id);
        await curLot.save();
        return res.status(200).json({message: "Saved a new single lot"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error});
    }
}

const createTicket = async (req,res) => {
    
}

module.exports = {
    newSingleLot,
}

