const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    default: [],
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  coverImage: {
    type: String,
  },
});

module.exports = mongoose.model('Trip', tripSchema);
