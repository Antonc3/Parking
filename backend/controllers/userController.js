const User = require('../models/User');
const stringHelper = require('../helper/stringHelper.js');
const config = require('../config.js');

const updateQrIdentifier = async (req,res) => {
    const newQr = await stringHelper.genUniqueIdentifier(config.identifierLength);
    await User.findByIdAndUpdate(req.user, {qrIdentifier: newQr}, {new: true})
        .then(updatedUser =>{
            if(updatedUser){
                res.json({ qrIdentifier: newQr, message: "User qrCode identifier successfully changed"});
            }
            else{
                res.status(404).json({ error: 'User not found or no changes were made' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};
const getQrIdentifier = async (req,res) => {
    try {
        const user = await User.findById(req.user);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ qrIdentifier: user.qrIdentifier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    updateQrIdentifier,
    getQrIdentifier,
}

