import React, { useState, useEffect } from 'react';
import AddTripModal from '../components/AddTripModal';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowRight, FaPlus, FaSuitcase } from 'react-icons/fa';

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTrips = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/trips`);
            const data = await res.json();
            if (data.success) {
                setTrips(data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
    );

    return (
        <div>
            {/* Hero Section */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Where to next, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Explorer?</span>
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                    Manage your itineraries, expenses, and memories in one beautiful place.
                </p>
                <div className="mt-8 flex justify-center">
                    <AddTripModal onTripAdded={fetchTrips} />
                </div>
            </div>

            {/* Trips Grid */}
            {trips.length === 0 ? (
                <div className="glass-panel p-12 rounded-2xl text-center max-w-lg mx-auto border-dashed border-2 border-gray-300">
                    <div className="bg-primary-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-500 text-3xl">
                        <FaSuitcase />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No trips planned yet</h3>
                    <p className="text-gray-500 mb-6">Your next adventure is just a click away.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trips.map(trip => (
                        <div key={trip._id} className="glass-card rounded-2xl overflow-hidden group hover:shadow-glow transition-all duration-500 relative">
                            {/* Decorative Gradient Header */}
                            <div className="h-32 bg-gradient-to-br from-primary-500 to-indigo-600 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                                <div className="absolute top-6 left-6 text-white">
                                    <h3 className="text-2xl font-bold tracking-tight">{trip.name}</h3>
                                    <div className="flex items-center text-blue-100 text-sm mt-1">
                                        <FaMapMarkerAlt className="mr-1.5" />
                                        {trip.destination}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center text-gray-500 text-sm mb-6 bg-gray-50 w-fit px-3 py-1 rounded-full border border-gray-100">
                                    <FaCalendarAlt className="mr-2 text-primary-500" />
                                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Link to={`/trips/${trip._id}/itinerary`} className="px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all text-center">
                                        Itinerary
                                    </Link>
                                    <Link to={`/trips/${trip._id}/expenses`} className="px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all text-center">
                                        Expenses
                                    </Link>
                                    <Link to={`/trips/${trip._id}/settlement`} className="px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-all text-center">
                                        Settlement
                                    </Link>
                                    <Link to={`/trips/${trip._id}/documents`} className="px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all text-center">
                                        Docs
                                    </Link>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <Link to={`/trips/${trip._id}/members`} className="text-xs font-medium text-gray-400 hover:text-primary-600 transition-colors">
                                        Manage Members
                                    </Link>
                                    <Link to={`/trips/${trip._id}/itinerary`} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                                        <FaArrowRight className="text-xs" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Trips;
