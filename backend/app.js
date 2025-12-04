const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const itineraryRoutes = require('./routes/itineraryRoutes');
const documentRoutes = require('./routes/documentRoutes');

const mongoose = require('mongoose');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const mongoose = require('mongoose');
const tripRoutes = require('./routes/tripRoutes');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-planner', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-planner')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1/itinerary', itineraryRoutes);
app.use('/api/v1/expenses', expenseRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/travel-planner', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/documents', documentRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Routes
app.use('/api/v1/trips', require('./routes/tripRoutes'));

module.exports = app;