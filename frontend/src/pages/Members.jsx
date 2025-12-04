import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Ensure we inherit global styles

const Members = () => {
    const { tripId } = useParams();
    const [members, setMembers] = useState([]);
    const [tripName, setTripName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newMemberName, setNewMemberName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/trips/${tripId}/members`);
                setMembers(response.data.members);
                setTripName(`Trip #${tripId}`);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching members:', err);
                setError('Failed to load members');
                setLoading(false);
            }
        };

        fetchMembers();
    }, [tripId]);

    const handleAddMember = async (e) => {
        e.preventDefault();
        if (!newMemberName.trim()) return;

        try {
            const response = await axios.post(`http://localhost:5000/api/v1/trips/${tripId}/members`, {
                name: newMemberName
            });

            setMembers(response.data.members);
            setNewMemberName('');
            setSuccessMessage('Member added successfully!');

            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('Error adding member:', err);
            setError('Failed to add member');
            setTimeout(() => setError(null), 3000);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="members-page card">
            <h1>{tripName}</h1>

            <div className="add-member-section">
                <h3>Add New Member</h3>
                <form onSubmit={handleAddMember} className="add-member-form">
                    <input
                        type="text"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                        placeholder="Enter member name"
                        className="member-input"
                    />
                    <button type="submit" disabled={!newMemberName.trim()}>
                        Add Member
                    </button>
                </form>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {error && <div className="error-message">{error}</div>}
            </div>

            <div className="members-list-section">
                <h2>Members List</h2>
                {members.length === 0 ? (
                    <p>No members yet.</p>
                ) : (
                    <ul className="members-list">
                        {members.map((member, index) => (
                            <li key={index} className="member-item">
                                {member}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <style>{`
        .members-page {
          max-width: 600px;
          margin: 0 auto;
          text-align: left;
        }
        .add-member-section {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: #f9f9f9;
          border-radius: 8px;
          border: 1px solid #eee;
        }
        .add-member-form {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }
        .member-input {
          flex: 1;
          padding: 0.6em 1.2em;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1em;
        }
        .success-message {
          color: green;
          font-weight: bold;
          margin-top: 10px;
        }
        .error-message {
          color: red;
          font-weight: bold;
          margin-top: 10px;
        }
        .members-list {
          list-style: none;
          padding: 0;
        }
        .member-item {
          padding: 10px;
          border-bottom: 1px solid #eee;
          font-size: 1.1em;
        }
        .member-item:last-child {
          border-bottom: none;
        }
        /* Dark mode support if system uses it */
        @media (prefers-color-scheme: dark) {
          .add-member-section {
            background: #2a2a2a;
            border-color: #444;
          }
          .member-input {
            background: #333;
            color: white;
            border-color: #555;
          }
        }
      `}</style>
        </div>
    );
};

export default Members;
