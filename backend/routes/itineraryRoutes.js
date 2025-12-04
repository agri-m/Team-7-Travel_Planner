const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');

// Create new itinerary item
router.post('/', async (req, res) => {
    try {
        const { tripId, title, time, day, order } = req.body;
        const newItem = new Itinerary({ tripId, title, time, day, order });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all items for a trip
router.get('/:tripId', async (req, res) => {
    try {
        const items = await Itinerary.find({ tripId: req.params.tripId }).sort({ order: 1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update item (for reordering or editing)
router.put('/:itemId', async (req, res) => {
    try {
        const { order } = req.body;
        const updatedItem = await Itinerary.findByIdAndUpdate(
            req.params.itemId,
            { order },
            { new: true }
        );
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
