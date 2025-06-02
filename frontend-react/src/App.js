import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CitizenSignup from './pages/CitizenSignup';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<CitizenSignup />} />
        
      </Routes>
    </Router>
  );
}

export default App;
