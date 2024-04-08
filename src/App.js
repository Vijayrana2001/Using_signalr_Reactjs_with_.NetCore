import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './HomePage'; 
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const isAuthenticated = localStorage.getItem("authToken"); 

  return (
    <Router>
      <div className="container-fluid homepage-bgimage">
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/HomePage" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;