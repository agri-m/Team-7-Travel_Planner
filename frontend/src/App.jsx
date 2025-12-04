import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Members from './pages/Members';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/trips/:tripId/members" element={<Members />} />
      </Routes>
    </Router>
  )
}

export default App

