const Expense = require('../models/Expense');

const minCashFlow = (balance) => {
  let creditors = [];
  let debtors = [];
  let result = [];

  for (let user in balance) {
    if (balance[user] > 0.01) creditors.push(user);
    if (balance[user] < -0.01) debtors.push(user);
  }

  let i = 0, j = 0;
  while (i < creditors.length && j < debtors.length) {
    let c = creditors[i];
    let d = debtors[j];

    // amount is min of what creditor is owed and what debtor owes
    let amount = Math.min(balance[c], -balance[d]);

    // Round to 2 decimal places
    amount = Math.round(amount * 100) / 100;

    if (amount > 0) {
      result.push({ from: d, to: c, amount });
    }

    balance[c] -= amount;
    balance[d] += amount;

    if (Math.abs(balance[c]) < 0.01) i++;
    if (Math.abs(balance[d]) < 0.01) j++;
  }

  return result;
};

exports.getSettlement = async (req, res) => {
  try {
    const { tripId } = req.params;
    const expenses = await Expense.find({ tripId });

    let balance = {};

    expenses.forEach(exp => {
      const payer = exp.paidBy;
      const totalAmount = exp.amount;

      if (!balance[payer]) balance[payer] = 0;
      balance[payer] += totalAmount;

      // Handle splits
      // Check if splits is a Map or Object (Mongoose Map behaves like Map)
      if (exp.splits) {
        if (exp.splits instanceof Map) {
          for (let [user, splitAmount] of exp.splits) {
            if (!balance[user]) balance[user] = 0;
            balance[user] -= splitAmount;
          }
        } else {
          // Fallback if it comes as object
          for (let user in exp.splits) {
            if (!balance[user]) balance[user] = 0;
            balance[user] -= exp.splits[user];
          }
        }
      }
    });

    // Round balances
    for (let user in balance) {
      balance[user] = Math.round(balance[user] * 100) / 100;
    }

    const settlements = minCashFlow(balance);

    res.status(200).json({
      status: 'success',
      data: {
        tripId,
        settlements
      }
    });
  } catch (error) {
    console.error('Settlement Error:', error);
    res.status(500).json({ message: 'Error calculating settlement', error: error.message });
  }
};
