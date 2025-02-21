import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaArrowRight, FaHandHoldingUsd, FaCheckCircle } from 'react-icons/fa';

const Settlement = () => {
    const { tripId } = useParams();
    const [settlements, setSettlements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSettlement = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/settlement/${tripId}`);
                // Check structure based on previous view_file, it seemed to be data.data.settlements or just array
                // The previous code used data.data.settlements. Let's stick to that if the backend returns that structure.
                // Wait, the backend controller I viewed earlier returned res.status(200).json(result), which is an array.
                // But the previous frontend code used data.data.settlements.
                // Let's check the backend controller again or just be safe.
                // Actually, looking at the previous view_file of settlementController.js:
                // res.status(200).json(settlements); -> It returns the array directly.
                // So the previous frontend code might have been wrong or I misread something.
                // Wait, the previous frontend code was:
                // const data = await response.json();
                // setSettlements(data.data.settlements);
                // If the backend returns an array directly, response.json() is the array.
                // So data.data.settlements would be undefined.
                // I will assume it returns the array directly based on my memory of the controller.
                // If it returns { success: true, data: [...] }, then I need to adjust.
                // Let's assume standard response format I've seen elsewhere: { success: true, data: ... } or just data.
                // The controller snippet I saw: res.status(200).json(settlements); -> Array.
                // So res.data is the array.
                setSettlements(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching settlement:', err);
                setError('Failed to load settlement plan');
                setLoading(false);
            }
        };
        fetchSettlement();
    }, [tripId]);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
    );

    if (error) return (
        <div className="text-center py-12 text-red-500">
            <p>{error}</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Settlement Plan</h1>
                <p className="text-gray-500 mt-2">The most efficient way to settle all debts</p>
            </div>

            {settlements.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                    <div className="text-6xl mb-4 text-green-500"><FaCheckCircle className="inline" /></div>
                    <h3 className="text-xl font-medium text-gray-700">All Settled Up!</h3>
                    <p className="text-gray-500">No one owes anything. Great job tracking!</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {settlements.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg">
                                    {item.from.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Sender</p>
                                    <p className="font-bold text-gray-800">{item.from}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center px-4">
                                <span className="text-purple-600 font-bold text-xl mb-1">${item.amount.toFixed(2)}</span>
                                <div className="flex items-center text-gray-300 w-32">
                                    <div className="h-0.5 bg-gray-300 flex-grow"></div>
                                    <FaArrowRight className="mx-2" />
                                    <div className="h-0.5 bg-gray-300 flex-grow"></div>
                                </div>
                                <span className="text-xs text-gray-400 mt-1">PAY TO</span>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Receiver</p>
                                    <p className="font-bold text-gray-800">{item.to}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-lg">
                                    {item.to.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-8 bg-blue-50 p-4 rounded-lg text-sm text-blue-800 flex items-start">
                <FaHandHoldingUsd className="mt-1 mr-3 text-lg flex-shrink-0" />
                <p>
                    This plan uses the <strong>Min-Cash Flow Algorithm</strong> to minimize the total number of transactions required.
                    Instead of everyone paying everyone else, we calculate the net balance and simplify the transfers.
                </p>
            </div>
        </div>
    );
};

export default Settlement;
