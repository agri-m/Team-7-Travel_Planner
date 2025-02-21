import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaCloudUploadAlt, FaFileAlt, FaFilePdf, FaImage, FaDownload, FaTrash } from 'react-icons/fa';

const Documents = () => {
    const { tripId } = useParams();
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/documents/${tripId}`);
            setDocuments(res.data);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('tripId', tripId);

        setUploading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/documents`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setDocuments([...documents, res.data]);
            setFile(null);
            // Reset file input
            e.target.reset();
        } catch (error) {
            console.error('Error uploading document:', error);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const getFileIcon = (url) => {
        if (!url) return <FaFileAlt className="text-blue-500 text-4xl" />;
        if (url.match(/\.(jpeg|jpg|gif|png)$/i)) return <FaImage className="text-purple-500 text-4xl" />;
        if (url.match(/\.(pdf)$/i)) return <FaFilePdf className="text-red-500 text-4xl" />;
        return <FaFileAlt className="text-blue-500 text-4xl" />;
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Trip Documents</h1>
                <p className="text-gray-500">Keep all your tickets and bookings in one place</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Upload Area */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="text-lg font-semibold mb-4">Upload New</h3>
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">
                                    {file ? file.name : "Click or drag file to upload"}
                                </p>
                            </div>
                            <button
                                type="submit"
                                disabled={!file || uploading}
                                className={`w-full py-2 rounded-lg font-medium text-white transition-colors ${!file || uploading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md'
                                    }`}
                            >
                                {uploading ? 'Uploading...' : 'Upload Document'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Documents Grid */}
                <div className="lg:col-span-3">
                    {loading ? (
                        <div className="text-center py-12">Loading documents...</div>
                    ) : documents.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                            <div className="text-6xl mb-4">📂</div>
                            <h3 className="text-xl font-medium text-gray-700">No documents yet</h3>
                            <p className="text-gray-500">Upload tickets, reservations, or maps.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {documents.map((doc) => (
                                <div key={doc._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                                    <div className="flex justify-center mb-4 h-24 items-center bg-gray-50 rounded-lg">
                                        {getFileIcon(doc.url)}
                                    </div>
                                    <h4 className="font-semibold text-gray-800 truncate mb-1" title={doc.originalName || doc.fileName || "Document"}>
                                        {doc.originalName || doc.fileName || "Document"}
                                    </h4>
                                    <p className="text-xs text-gray-400 mb-4">
                                        {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : 'Unknown Date'}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <a
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                        >
                                            <FaDownload className="mr-1" /> Download
                                        </a>
                                        {/* Delete button could go here */}
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

export default Documents;
