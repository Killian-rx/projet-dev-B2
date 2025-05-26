// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Projects from './pages/projects';
import Board from './pages/board';
import NavBar from './components/NavBar';
import Profile from './pages/profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('token');

  // Fonction pour mettre à jour l'état d'authentification
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {token && <NavBar />}
      <Routes>
        {/* Si authentifié, afficher la page Home, sinon rediriger vers login */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
        {/* Rediriger vers /projects si authentifié, sinon vers /login */}
        <Route path="/projects" element={isAuthenticated ? <Projects /> : <Navigate to="/login" replace />} />
        <Route path="/boards/:id" element={isAuthenticated ? <Board /> : <Navigate to="/login" replace />} />
        {/* Passer handleLoginSuccess comme prop */}
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
