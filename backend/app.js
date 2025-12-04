const express = require('express');
const cors = require('cors');
const documentRoutes = require('./routes/documentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/documents', documentRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Routes
app.use('/api/v1/trips', require('./routes/tripRoutes'));

module.exports = app;