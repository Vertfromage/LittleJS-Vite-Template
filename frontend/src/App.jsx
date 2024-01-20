import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// Import other page components as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Define other routes here, using the element prop */}
      </Routes>
    </Router>
  );
}

export default App;

