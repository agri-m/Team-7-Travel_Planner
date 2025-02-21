import React, { useState } from 'react';
import { FaPlus, FaTimes, FaPlane, FaCalendarAlt } from 'react-icons/fa';

const AddTripModal = ({ onTripAdded }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        destination: '',
        startDate: '',
        endDate: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/trips`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                onTripAdded();
                setFormData({ name: '', destination: '', startDate: '', endDate: '' });
                setIsOpen(false);
            }
        } catch (err) {
            console.error(err);
            alert('Error adding trip');
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-1 font-semibold"
            >
                <FaPlus />
                <span>New Adventure</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Modal */}
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
                        <div className="bg-gradient-to-r from-primary-600 to-indigo-600 p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                            <div className="flex justify-between items-center relative z-10">
                                <h3 className="text-xl font-bold flex items-center">
                                    <FaPlane className="mr-2" /> Plan a Trip
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                            <p className="text-blue-100 text-sm mt-1">Start your next journey here.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Trip Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Summer Roadtrip 2024"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Destination</label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    placeholder="e.g. Paris, France"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-0.5"
                                >
                                    Create Adventure
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddTripModal;
