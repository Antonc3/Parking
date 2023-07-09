const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const userController = require('./controllers/userController.js');

// Login route
router.post('/user/login', authController.login);

router.post('/user/create', authController.createUser);

router.put('/user/changepassword',authController.authenticateToken, authController.changePassword);

router.put('/user/genQrIdentifier',authController.authenticateToken, userController.updateQrIdentifier);

router.get('/user/qrIdentifier', authController.authenticateToken, userController.getQrIdentifier);

module.exports = router;
