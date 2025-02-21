const express = require('express');
const cors = require('cors');

// Import Routes
const tripRoutes = require('./routes/tripRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const documentRoutes = require('./routes/documentRoutes');
const settlementRoutes = require('./routes/settlementRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/itinerary', itineraryRoutes);
app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/settlement', settlementRoutes);

app.get('/', (req, res) => {
    res.send('Travel Planner API is running');
});

module.exports = app;