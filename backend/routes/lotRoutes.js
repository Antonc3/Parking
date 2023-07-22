const express = require('express');
const router = express.Router();
const lotAuthController = require('../controllers/lotAuthController');

router.post('/login', lotAuthController.login);

router.post('/create', lotAuthController.createLot);

router.put('/changePassword',lotAuthController.authenticateToken,lotAuthController.changePassword);

router.get('/stripe/loginUrl', lotAuthController.authenticateToken, lotAuthController.genLoginLink);

router.get('/stripe/accountUrl', lotAuthController.authenticateToken, lotAuthController.genAccountLink);

module.exports = router;
