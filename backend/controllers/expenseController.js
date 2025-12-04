const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
    try {
        const { tripId, title, amount, paidBy, splits } = req.body;
        const expense = new Expense({
            tripId,
            title,
            amount,
            paidBy,
            splits
        });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const { tripId } = req.params;
        const expenses = await Expense.find({ tripId });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error: error.message });
    }
};
