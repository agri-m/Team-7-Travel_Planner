const Trip = require('../models/Trip');

// @desc    Create a new trip
// @route   POST /api/v1/trips
// @access  Public
exports.createTrip = async (req, res) => {
    try {
        const { name, destination, startDate, endDate } = req.body;

        const trip = await Trip.create({
            name,
            destination,
            startDate,
            endDate
        });

        res.status(201).json({
            success: true,
            data: trip
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get all trips
// @route   GET /api/v1/trips
// @access  Public
exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find().sort({ startDate: 1 });

        res.status(200).json({
            success: true,
            count: trips.length,
            data: trips
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
