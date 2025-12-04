const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-planner', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.use('/api/v1/expenses', expenseRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

module.exports = app;