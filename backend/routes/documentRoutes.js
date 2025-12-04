const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.post('/', documentController.uploadMiddleware, documentController.uploadDocument);
router.get('/:tripId', documentController.getDocuments);

module.exports = router;
