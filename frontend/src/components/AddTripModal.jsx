import React, { useState } from 'react';

const AddTripModal = ({ onTripAdded }) => {
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
            const res = await fetch('http://localhost:5000/api/v1/trips', {
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
                alert('Trip added successfully!');
            }
        } catch (err) {
            console.error(err);
            alert('Error adding trip');
        }
    };

    return (
        <div style={{ border: '1px solid black', padding: '20px', margin: '20px 0' }}>
            <h3>Add New Trip</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Trip Name: </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Destination: </label>
                    <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />
                </div>
                <div>
                    <label>Start Date: </label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                </div>
                <div>
                    <label>End Date: </label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                </div>
                <button type="submit">Create Trip</button>
            </form>
        </div>
    );
};

export default AddTripModal;
