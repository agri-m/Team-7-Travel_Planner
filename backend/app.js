const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Route Imports
const tripRoutes = require('./routes/tripRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const settlementRoutes = require('./routes/settlementRoutes');
const documentRoutes = require('./routes/documentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/itinerary', itineraryRoutes);
app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/settlement', settlementRoutes);
app.use('/api/v1/documents', documentRoutes);

module.exports = app;