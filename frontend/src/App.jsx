import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Settlement from './pages/Settlement';
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

export default App;
