const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Routes
app.use('/api/v1/trips', require('./routes/tripRoutes'));

module.exports = app;