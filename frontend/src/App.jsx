import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaPlane, FaSuitcaseRolling, FaWallet, FaFileAlt, FaUsers, FaHome } from 'react-icons/fa';
import Trips from './pages/Trips';
import Itinerary from './pages/Itinerary';
import Expenses from './pages/Expenses';
import Settlement from './pages/Settlement';
import Documents from './pages/Documents';
import Members from './pages/Members';
import './App.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <FaHome />, label: 'Home' },
    { path: '/trips', icon: <FaPlane />, label: 'Trips' },
  ];

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <nav className="glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-glass">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-primary-500 text-white p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
            <FaSuitcaseRolling />
          </div>
          <span className="font-bold text-gray-800 tracking-tight text-lg group-hover:text-primary-600 transition-colors">
            Travel<span className="text-primary-500">Planner</span>
          </span>
        </Link>

        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${isActive
                    ? 'bg-primary-50 text-primary-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <Navbar />

        <main className="max-w-7xl mx-auto animate-fade-in-up">
          <Routes>
            <Route path="/" element={<Trips />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/trips/:tripId/itinerary" element={<Itinerary />} />
            <Route path="/trips/:tripId/expenses" element={<Expenses />} />
            <Route path="/trips/:tripId/settlement" element={<Settlement />} />
            <Route path="/trips/:tripId/documents" element={<Documents />} />
            <Route path="/trips/:tripId/members" element={<Members />} />
          </Routes>
        </main>

        <footer className="mt-20 text-center text-gray-400 text-sm">
          <p>© 2024 Travel Planner. Crafted for explorers.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
