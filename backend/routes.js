const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const paymentController = require('./controllers/paymentController')
const lotAuthController = require('./controllers/lotAuthController')

//user stuff
router.post('/user/login', authController.login);

router.post('/user/create', authController.createUser);

router.put('/user/changePassword',authController.authenticateToken, authController.changePassword);

router.put('/user/genQrIdentifier',authController.authenticateToken, userController.updateQrIdentifier);

router.get('/user/qrIdentifier', authController.authenticateToken, userController.getQrIdentifier);

router.get('/user/payment/getPaymentMethods', authController.authenticateToken, paymentController.getPaymentMethods);

router.post('/user/payment/saveCard', authController.authenticateToken, paymentController.saveCard);

router.put('/user/payment/changeActivePaymentMethod', authController.authenticateToken, paymentController.setActivePaymentMethod);

//lot stuff
router.post('/lot/login', lotAuthController.login);

router.post('/lot/create', lotAuthController.createLot);

router.put('/lot/changePassword',lotAuthController.authenticateToken,lotAuthController.changePassword);

router.get('/lot/stripe/loginUrl', lotAuthController.authenticateToken, lotAuthController.genLoginLink);

router.get('/lot/stripe/accountUrl', lotAuthController.authenticateToken, lotAuthController.genAccountLink);

module.exports = router;
