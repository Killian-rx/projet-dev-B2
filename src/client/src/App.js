// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import './App.css'; // Importer le fichier CSS pour le style

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fonction pour mettre à jour l'état d'authentification
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {/* Si authentifié, afficher la page Home, sinon rediriger vers login */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
        {/* Passer handleLoginSuccess comme prop */}
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
