import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Expenses from './pages/Expenses';
import './App.css'

function App() {
  return (
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
    </Router>
  )
}

export default App
