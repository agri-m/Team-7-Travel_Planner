import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaUserPlus, FaUser, FaTrash, FaEnvelope } from 'react-icons/fa';

const Members = () => {
  const { tripId } = useParams();
  const [members, setMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/trips/${tripId}/members`);
      // Based on previous code, it returns { members: [...] }
      setMembers(res.data.members || []);
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/trips/${tripId}/members`, {
        name: newMemberName
      });
      // Based on previous code, it returns { members: [...] }
      setMembers(res.data.members || []);
      setNewMemberName('');
      setSuccessMessage('Member added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding member:', error);
      setError('Failed to add member');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Trip Members</h1>
        <p className="text-gray-500">Manage who is going on this adventure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add Member Form */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaUserPlus className="mr-2 text-blue-500" />
              Invite Member
            </h3>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={!newMemberName.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add Member
              </button>
              {successMessage && <p className="text-green-600 text-sm text-center">{successMessage}</p>}
              {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            </form>
          </div>
        </div>

        {/* Members List */}
        <div className="md:col-span-2">
          {loading ? (
            <div className="text-center py-12">Loading members...</div>
          ) : members.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
              <div className="text-5xl mb-3">👥</div>
              <p className="text-gray-500">No members yet. Invite someone!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {members.map((member, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center font-bold text-xl">
                    {typeof member === 'string' ? member.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <h4 className="font-bold text-gray-800 truncate">{typeof member === 'string' ? member : 'Unknown'}</h4>
                    <div className="flex items-center text-gray-500 text-sm truncate">
                      <FaUser className="mr-1.5 text-xs" />
                      Member
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;
