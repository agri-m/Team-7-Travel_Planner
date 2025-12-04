const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    tripId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paidBy: {
        type: String,
        required: true
    },
    splits: {
        type: Map,
        of: Number, // Stores user: amount pairs
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Expense', expenseSchema);
