// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Projects from './pages/projects';
import Board from './pages/board';
import Profile from './pages/profile';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Always accessible */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/boards/:id" element={token ? <Board /> : <Navigate to="/login" replace />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
