import React, { useState, useEffect } from 'react';
import AddTripModal from '../components/AddTripModal';

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

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Trips</h1>
            <AddTripModal onTripAdded={fetchTrips} />
            <div className="trip-list">
                {trips.map(trip => (
                    <div key={trip._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h3>{trip.name}</h3>
                        <p>Destination: {trip.destination}</p>
                        <p>
                            {new Date(trip.startDate).toLocaleDateString()} -
                            {new Date(trip.endDate).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trips;
