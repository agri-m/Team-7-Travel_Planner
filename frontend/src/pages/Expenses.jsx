import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const tripId = 'trip123'; // Hardcoded for now as per plan

    useEffect(() => {
        // Placeholder for fetching expenses
        setLoading(false);
    }, []);

    return (
        <div className="expenses-container">
            <h1>Expenses</h1>
            <div className="expense-form-container">
                {/* Form will go here */}
                <p>Form Placeholder</p>
            </div>
            <div className="expense-list-container">
                {/* List will go here */}
                <p>List Placeholder</p>
            </div>
        </div>
    );
};

export default Expenses;
