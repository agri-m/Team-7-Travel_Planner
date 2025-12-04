const Document = require('../models/Document');
const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({ storage: storage });

exports.uploadMiddleware = upload.single('file');

exports.uploadDocument = async (req, res) => {
    try {
        const { tripId } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        if (!tripId) {
            return res.status(400).json({ message: 'Trip ID is required' });
        }

        const newDocument = new Document({
            tripId,
            fileName: file.originalname,
            filePath: file.path,
        });

        await newDocument.save();

        res.status(201).json({ message: 'File uploaded successfully', document: newDocument });
    } catch (error) {
        console.error('Error uploading document:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getDocuments = async (req, res) => {
    try {
        const { tripId } = req.params;
        const documents = await Document.find({ tripId }).sort({ uploadedAt: -1 });
        res.status(200).json(documents);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
