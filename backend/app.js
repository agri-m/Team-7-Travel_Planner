const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const settlementRoutes = require('./routes/settlementRoutes');

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/api/v1/settlement', settlementRoutes);

module.exports = app;