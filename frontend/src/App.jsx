import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Pages
import Trips from './pages/Trips';
import Itinerary from './pages/Itinerary';
import Expenses from './pages/Expenses';
import Settlement from './pages/Settlement';
import Members from './pages/Members';
import Documents from './pages/Documents';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="brand">Travel Planner</Link>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/">Trips</Link>
            <Link to="/itinerary">Itinerary</Link>
            <Link to="/expenses">Expenses</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Trips />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/settlement/:tripId" element={<Settlement />} />
            <Route path="/trips/:tripId/members" element={<Members />} />
            <Route path="/documents/:tripId" element={<Documents />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
