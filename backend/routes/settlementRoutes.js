const express = require('express');
const settlementController = require('../controllers/settlementController');

const router = express.Router();

router.get('/:tripId', settlementController.getSettlement);

module.exports = router;
