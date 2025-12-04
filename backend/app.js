const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
const tripRoutes = require('./routes/tripRoutes');

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/travel-planner', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/v1/trips', tripRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

module.exports = app;