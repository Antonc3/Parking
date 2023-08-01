const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const paymentController = require('../controllers/paymentController');

router.post('/login', authController.login);

router.post('/create', authController.createUser);

router.get('/checkTokenValid', authController.authenticateToken, authController.checkTokenValid);

router.put('/changePassword',authController.authenticateToken, authController.changePassword);

router.put('/genQrIdentifier',authController.authenticateToken, userController.updateQrIdentifier);

router.get('/qrIdentifier', authController.authenticateToken, userController.getQrIdentifier);

router.get('/payment/getPaymentMethods', authController.authenticateToken, paymentController.getPaymentMethods);

router.post('/payment/saveCard', authController.authenticateToken, paymentController.saveCard);

router.put('/payment/changeActivePaymentMethod', authController.authenticateToken, paymentController.setActivePaymentMethod);

module.exports = router;