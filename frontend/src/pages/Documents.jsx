import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Documents = () => {
    const { tripId } = useParams();
    const [file, setFile] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, [tripId]);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/documents/${tripId}`);
            setDocuments(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching documents:", err);
            setError("Failed to load documents.");
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

        try {
            await axios.post('http://localhost:5000/api/v1/documents', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFile(null);
            fetchDocuments(); // Refresh list
        } catch (err) {
            console.error("Error uploading document:", err);
            setError("Failed to upload document.");
        }
    };

    return (
        <div className="documents-container" style={{ padding: '20px' }}>
            <h2>Document Vault</h2>

            <div className="upload-section" style={{ marginBottom: '20px' }}>
                <h3>Upload Document</h3>
                <form onSubmit={handleUpload}>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit" disabled={!file} style={{ marginLeft: '10px' }}>
                        Upload
                    </button>
                </form>
            </div>

            <div className="list-section">
                <h3>Uploaded Documents</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : documents.length === 0 ? (
                    <p>No documents uploaded yet.</p>
                ) : (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {documents.map((doc) => (
                            <li key={doc._id} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                                <a
                                    href={`http://localhost:5000/${doc.filePath}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', color: '#007bff' }}
                                >
                                    {doc.fileName}
                                </a>
                                <span style={{ marginLeft: '10px', fontSize: '0.8em', color: '#666' }}>
                                    {new Date(doc.uploadedAt).toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Documents;
