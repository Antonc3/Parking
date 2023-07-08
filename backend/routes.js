const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const userController = require('./controllers/userController.js');
const genQrCode = require('./helper/qrcode.js');
const User = require('./models/User.js');

// Login route
router.post('/user/login', authController.login);

router.post('/user/create', authController.createUser);

router.put('/user/changepassword',authController.authenticateToken, authController.changePassword);

router.put('/user/genQrCode',authController.authenticateToken, userController.updateQrCode);

router.get('/user/qrCode', authController.authenticateToken, userController.getQrCode);

module.exports = router;
