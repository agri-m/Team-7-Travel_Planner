```
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const tripId = 'trip123'; // Hardcoded for now

    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        paidBy: '',
        splits: [{ user: '', amount: '' }, { user: '', amount: '' }] // Start with 2 splits
    });

    useEffect(() => {
        // Placeholder for fetching expenses
        setLoading(false);
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSplitChange = (index, field, value) => {
        const newSplits = [...formData.splits];
        newSplits[index][field] = value;
        setFormData({ ...formData, splits: newSplits });
    };

    const addSplit = () => {
        setFormData({ ...formData, splits: [...formData.splits, { user: '', amount: '' }] });
    };

    const removeSplit = (index) => {
        if (formData.splits.length > 2) {
            const newSplits = formData.splits.filter((_, i) => i !== index);
            setFormData({ ...formData, splits: newSplits });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate splits sum matches total amount (optional but good practice)
        // Convert splits array to map/object for backend
        const splitsMap = {};
        formData.splits.forEach(split => {
            if (split.user && split.amount) {
                splitsMap[split.user] = Number(split.amount);
            }
        });

        try {
            const payload = {
                tripId,
                title: formData.title,
                amount: Number(formData.amount),
                paidBy: formData.paidBy,
                splits: splitsMap
            };
            await axios.post('http://localhost:5000/api/v1/expenses', payload);
            alert('Expense added successfully!');
            // Reset form or fetch expenses
            setFormData({
                title: '',
                amount: '',
                paidBy: '',
                splits: [{ user: '', amount: '' }, { user: '', amount: '' }]
            });
        } catch (error) {
            console.error('Error adding expense:', error);
            alert('Failed to add expense');
        }
    };

    return (
        <div className="expenses-container">
            <h1>Expenses</h1>

            <div className="expense-form-container" style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
                <h2>Add New Expense</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Title: </label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Amount: </label>
                        <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Paid By: </label>
                        <input type="text" name="paidBy" value={formData.paidBy} onChange={handleInputChange} required />
                    </div>

                    <h3>Splits</h3>
                    {formData.splits.map((split, index) => (
                        <div key={index} style={{ marginBottom: '5px' }}>
                            <input
                                type="text"
                                placeholder="User Name"
                                value={split.user}
                                onChange={(e) => handleSplitChange(index, 'user', e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                value={split.amount}
                                onChange={(e) => handleSplitChange(index, 'amount', e.target.value)}
                                required
                            />
                            {formData.splits.length > 2 && (
                                <button type="button" onClick={() => removeSplit(index)}>Remove</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addSplit}>Add Split User</button>

                    <div style={{ marginTop: '10px' }}>
                        <button type="submit">Submit Expense</button>
                    </div>
                </form>
            </div>

            <div className="expense-list-container">
                {/* List will go here */}
                <p>List Placeholder</p>
            </div>
        </div>
    );
};

export default Expenses;
```
