const User = require('../models/User');
const genQrCode = require('../helper/qrcode.js');

const updateQrCode = async (req,res) => {
    const newQr = genQrCode.generateQRCode("park");
    await User.findByIdAndUpdate(req.user, {qrCodeUrl: newQr}, {new: true})
        .then(updatedUser =>{
            if(updatedUser){
                res.json({ message: "User qrCode successfully changed"});
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
const getQrCode = async (req,res) => {
    try {
        const user = await User.findById(req.user);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ qrCode: user.qrCodeUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    updateQrCode,
    getQrCode,
}

