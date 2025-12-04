const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const itineraryRoutes = require('./routes/itineraryRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-planner')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1/itinerary', itineraryRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

module.exports = app;