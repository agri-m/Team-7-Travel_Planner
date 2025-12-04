import React, { useState, useEffect } from 'react';
import AddTripModal from '../components/AddTripModal';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTrips = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/v1/trips');
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

    if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-8">
                <h1>My Trips</h1>
                <AddTripModal onTripAdded={fetchTrips} />
            </div>

            <div className="trip-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {trips.map((trip, index) => (
                    <motion.div
                        key={trip._id}
                        className="glass-panel"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}
                    >
                        {/* Decorative gradient blob */}
                        <div style={{
                            position: 'absolute',
                            top: '-50%',
                            right: '-50%',
                            width: '200px',
                            height: '200px',
                            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                            filter: 'blur(40px)',
                            zIndex: 0
                        }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{trip.name}</h3>

                            <div className="flex items-center gap-2 mb-4 text-secondary">
                                <MapPin size={18} />
                                <span style={{ fontWeight: 500 }}>{trip.destination}</span>
                            </div>

                            <div className="flex justify-between items-center mt-8">
                                <div className="flex items-center gap-2 text-secondary" style={{ fontSize: '0.9rem' }}>
                                    <Calendar size={16} />
                                    <span>
                                        {new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} -
                                        {new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                                <button className="secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                    View Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Trips;
