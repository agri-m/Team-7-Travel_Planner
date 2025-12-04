import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Documents from './pages/Documents';
import Trips from './pages/Trips';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/documents/test-trip-id">Test Document Vault</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <div style={{ padding: '20px' }}>
              <h1>Travel Planner</h1>
              <p>Welcome to the Travel Planner App.</p>
            </div>
          } />
          <Route path="/documents/:tripId" element={<Documents />} />
        </Routes>
      </div>
    </Router>
    <div className="App">
      <Trips />
    </div>
  );
}

export default App;
