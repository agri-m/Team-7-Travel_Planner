import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Settlement from './pages/Settlement';
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Expenses from './pages/Expenses';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Members from './pages/Members';
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Documents from './pages/Documents';
import Trips from './pages/Trips';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <h1>Travel Planner</h1>
            <p>Welcome to the Travel Planner App</p>
          </div>
        } />
        <Route path="/settlement/:tripId" element={<Settlement />} />
      </Routes>
    </BrowserRouter>
  );
}

    <Router>
      <div className="app">
        <nav>
          <Link to="/">Home</Link> | <Link to="/expenses">Expenses</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Welcome to Travel Planner</h1>} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </div>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/trips/:tripId/members" element={<Members />} />
      </Routes>
    </Router>
  )
}

export default App

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
