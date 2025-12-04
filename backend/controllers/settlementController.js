const minCashFlow = (balance) => {
  let creditors = [];
  let debtors = [];
  let result = [];

  for (let user in balance) {
    if (balance[user] > 0) creditors.push(user);
    if (balance[user] < 0) debtors.push(user);
  }

  let i = 0, j = 0;
  while (i < creditors.length && j < debtors.length) {
    let c = creditors[i];
    let d = debtors[j];
    
    // amount is min of what creditor is owed and what debtor owes
    let amount = Math.min(balance[c], -balance[d]);
    
    // Round to 2 decimal places to avoid floating point issues
    amount = Math.round(amount * 100) / 100;

    if (amount > 0) {
        result.push({ from: d, to: c, amount });
    }

    balance[c] -= amount;
    balance[d] += amount;

    // Check for 0 with small epsilon for float safety, or just strict 0 if integers
    // Using strict 0 as per prompt algorithm, but JS floats might be tricky.
    // The prompt algorithm uses `balance[c] === 0`. I will stick to it but maybe add a small epsilon check if needed.
    // For now, sticking strictly to prompt algorithm but adding the loop logic.
    
    // Re-evaluating the prompt's algorithm:
    // if (balance[c] === 0) i++;
    // if (balance[d] === 0) j++;
    
    // With floating point math, exact 0 is rare. I'll use a small epsilon.
    if (Math.abs(balance[c]) < 0.01) i++;
    if (Math.abs(balance[d]) < 0.01) j++;
  }

  return result;
};

exports.getSettlement = (req, res) => {
  const { tripId } = req.params;

  // Mock Expenses Data
  // In a real app, this would come from a database based on tripId
  const expenses = [
    { payer: 'A', amount: 300, involved: ['A', 'B', 'C'] }, 
    { payer: 'C', amount: 150, involved: ['A', 'C'] },
    { payer: 'B', amount: 50, involved: ['B', 'C'] }
  ];

  // Calculate Balances
  let balance = {};
  
  // Initialize users found in expenses
  expenses.forEach(exp => {
    if (!balance[exp.payer]) balance[exp.payer] = 0;
    exp.involved.forEach(user => {
        if (!balance[user]) balance[user] = 0;
    });
  });

  expenses.forEach(exp => {
    const splitAmount = exp.amount / exp.involved.length;
    
    balance[exp.payer] += exp.amount;
    
    exp.involved.forEach(user => {
        balance[user] -= splitAmount;
    });
  });

  // Clean up balances (round to 2 decimals)
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
};
