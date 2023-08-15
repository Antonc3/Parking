const express = require('express');
const router = express.Router();
const lotAuthController = require('../controllers/lotAuthController');
const lotController = require('../controllers/lotController');

router.post('/login', lotAuthController.login);

router.post('/create', lotAuthController.createLot);

router.post('/singleLot/create',lotAuthController.authenticateToken,lotController.createSingleLot)

router.put('/changePassword',lotAuthController.authenticateToken,lotAuthController.changePassword);

router.get('/stripe/loginUrl', lotAuthController.authenticateToken, lotAuthController.genLoginLink);

router.get('/stripe/accountUrl', lotAuthController.authenticateToken, lotAuthController.genAccountLink);

router.post('/ticket/create', lotAuthController.authenticateToken, lotController.createTicket);

router.post('/ticket/end', lotAuthController.authenticateToken, lotController.endTicket);

module.exports = router;
