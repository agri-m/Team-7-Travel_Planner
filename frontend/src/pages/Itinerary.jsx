import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaClock, FaMapMarkerAlt, FaGripVertical, FaPlus } from 'react-icons/fa';

const Itinerary = () => {
    const { tripId } = useParams();
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({
        title: '',
        time: '',
        day: 1
    });

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/itinerary/${tripId}`);
            setActivities(res.data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const order = activities.length;
            const activityData = { ...newActivity, tripId, order };
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/itinerary`, activityData);
            setActivities([...activities, res.data]);
            setNewActivity({ title: '', time: '', day: 1 });
        } catch (error) {
            console.error('Error adding activity:', error);
        }
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(activities);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setActivities(items);

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/itinerary/${reorderedItem._id}`, {
                order: result.destination.index
            });
        } catch (error) {
            console.error("Error updating order", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Trip Itinerary</h2>
                <p className="text-gray-500">Drag and drop to reorder your schedule</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Activity Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <FaPlus className="mr-2 text-blue-500" />
                            Add Activity
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Activity Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g. Visit Eiffel Tower"
                                    value={newActivity.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={newActivity.time}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                                <input
                                    type="number"
                                    name="day"
                                    min="1"
                                    value={newActivity.day}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors shadow-md"
                            >
                                Add to Schedule
                            </button>
                        </form>
                    </div>
                </div>

                {/* Timeline */}
                <div className="lg:col-span-2">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="activities">
                            {(provided) => (
                                <ul
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent"
                                >
                                    {activities.map((activity, index) => (
                                        <Draggable key={activity._id} draggableId={activity._id} index={index}>
                                            {(provided, snapshot) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active ${snapshot.isDragging ? 'opacity-50' : ''}`}
                                                >
                                                    {/* Icon */}
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                                        <FaMapMarkerAlt />
                                                    </div>

                                                    {/* Card */}
                                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                                                        <div>
                                                            <div className="flex items-center space-x-2 mb-1">
                                                                <span className="font-bold text-slate-900">{activity.title}</span>
                                                                <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">Day {activity.day}</span>
                                                            </div>
                                                            <div className="text-slate-500 text-sm flex items-center">
                                                                <FaClock className="mr-1 text-xs" /> {activity.time}
                                                            </div>
                                                        </div>
                                                        <div {...provided.dragHandleProps} className="text-gray-400 hover:text-gray-600 cursor-grab p-2">
                                                            <FaGripVertical />
                                                        </div>
                                                    </div>
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>

                    {activities.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No activities yet. Add one to start your timeline!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Itinerary;
