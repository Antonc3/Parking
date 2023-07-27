const express = require('express');
const router = express.Router();
const lotAuthController = require('../controllers/lotAuthController');
const lotController = require('../controllers/lotController');

router.post('/login', lotAuthController.login);

router.post('/create', lotAuthController.createLot);

router.put('/changePassword',lotAuthController.authenticateToken,lotAuthController.changePassword);

router.get('/stripe/loginUrl', lotAuthController.authenticateToken, lotAuthController.genLoginLink);

router.get('/stripe/accountUrl', lotAuthController.authenticateToken, lotAuthController.genAccountLink);

router.post('/createTicket', lotAuthController.authenticateToken, lotController.createTicket);

router.post('/endTicket', lotAuthController.authenticateToken, lotController.endTicket);

module.exports = router;
