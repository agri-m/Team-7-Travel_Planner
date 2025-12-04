import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Itinerary from './pages/Itinerary';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <Link to="/">Home</Link> | <Link to="/itinerary">Itinerary</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Welcome to Travel Planner</h1>} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
