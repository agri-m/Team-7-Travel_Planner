const express = require('express');
const router = express.Router();
const settlementController = require('../controllers/settlementController');

router.get('/:tripId', settlementController.getSettlement);

module.exports = router;
