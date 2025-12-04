import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Settlement = () => {
    const { tripId } = useParams();
    const [settlements, setSettlements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSettlement = async () => {
            try {
                // Assuming backend is running on port 5000
                const response = await fetch(`http://localhost:5000/api/v1/settlement/${tripId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch settlement data');
                }
                const data = await response.json();
                setSettlements(data.data.settlements);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSettlement();
    }, [tripId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="settlement-container" style={{ padding: '20px' }}>
            <h1>Settlement for Trip {tripId}</h1>
            {settlements.length === 0 ? (
                <p>No debts to settle!</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {settlements.map((item, index) => (
                        <li key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                            <strong>{item.from}</strong> pays <strong>{item.to}</strong>: ${item.amount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Settlement;
