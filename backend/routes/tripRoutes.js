const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

// POST /api/v1/trips/:tripId/members
router.post('/:tripId/members', async (req, res) => {
    try {
        const { tripId } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Member name is required' });
        }

        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        trip.members.push(name);
        await trip.save();

        res.status(200).json({ message: 'Member added successfully', members: trip.members });
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
