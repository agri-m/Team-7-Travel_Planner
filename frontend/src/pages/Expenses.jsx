import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaMoneyBillWave, FaPlus, FaTrash, FaUser, FaReceipt } from 'react-icons/fa';

const Expenses = () => {
    const { tripId } = useParams();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        paidBy: '',
        splits: [{ user: '', amount: '' }, { user: '', amount: '' }] // Start with 2 splits
    });

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/expenses/${tripId}`);
            setExpenses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
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
            await axios.post(`${import.meta.env.VITE_API_URL}/expenses`, payload);
            alert('Expense added successfully!');
            setFormData({
                title: '',
                amount: '',
                paidBy: '',
                splits: [{ user: '', amount: '' }, { user: '', amount: '' }]
            });
            fetchExpenses(); // Refresh list
        } catch (error) {
            console.error('Error adding expense:', error);
            alert('Failed to add expense');
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Trip Expenses</h1>
                <p className="text-gray-500">Track spending and split costs easily</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Expense Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-lg font-semibold mb-4 flex items-center">
                            <FaPlus className="mr-2 text-green-500" />
                            Log Expense
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Dinner at Mario's"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Paid By</label>
                                <input
                                    type="text"
                                    name="paidBy"
                                    value={formData.paidBy}
                                    onChange={handleInputChange}
                                    placeholder="Name of payer"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Split Details</h3>
                                {formData.splits.map((split, index) => (
                                    <div key={index} className="flex space-x-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="User"
                                            value={split.user}
                                            onChange={(e) => handleSplitChange(index, 'user', e.target.value)}
                                            className="w-1/2 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 outline-none"
                                            required
                                        />
                                        <input
                                            type="number"
                                            placeholder="Amt"
                                            value={split.amount}
                                            onChange={(e) => handleSplitChange(index, 'amount', e.target.value)}
                                            className="w-1/3 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 outline-none"
                                            required
                                        />
                                        {formData.splits.length > 2 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSplit(index)}
                                                className="text-red-400 hover:text-red-600 p-1"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addSplit}
                                    className="text-sm text-green-600 hover:text-green-700 font-medium mt-1 inline-flex items-center"
                                >
                                    <FaPlus size={10} className="mr-1" /> Add Person
                                </button>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors shadow-md"
                                >
                                    Save Expense
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Expense List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
                        </div>

                        {loading ? (
                            <div className="p-8 text-center text-gray-500">Loading expenses...</div>
                        ) : expenses.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="text-4xl mb-3">💸</div>
                                <p className="text-gray-500">No expenses recorded yet.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                                        <tr>
                                            <th className="px-6 py-4">Description</th>
                                            <th className="px-6 py-4">Paid By</th>
                                            <th className="px-6 py-4">Splits</th>
                                            <th className="px-6 py-4 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {expenses.map((expense) => (
                                            <tr key={expense._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                                                            <FaReceipt size={14} />
                                                        </div>
                                                        <span className="font-medium text-gray-900">{expense.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {expense.paidBy}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex -space-x-2 overflow-hidden">
                                                        {Object.keys(expense.splits).map((user, i) => (
                                                            <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600" title={user}>
                                                                {user.charAt(0).toUpperCase()}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-gray-900">
                                                    ${expense.amount.toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Expenses;
