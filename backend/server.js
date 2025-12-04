require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5000;

// Connect to database
// Connect to database
// connectDB() called above

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
