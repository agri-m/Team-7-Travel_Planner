const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    tripId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    order: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Itinerary', itinerarySchema);
