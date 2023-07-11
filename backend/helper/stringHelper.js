const User = require('../models/User.js');

const generateRandomString = (n) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

const genUniqueIdentifier = async (n) =>{
    var str = generateRandomString(n);
    var unique = false; 
    while(!unique){
        const foundUser = await User.findOne({qrCodeIdentifier: str})
        if(!foundUser){
            unique = true;
        }
        else{
            str = generateRandomString(n);
        }
    }
    return str;
};
module.exports = {
    genUniqueIdentifier
}
