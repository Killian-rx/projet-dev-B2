// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TokenProvider, TokenContext } from './context/TokenContext';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Projects from './pages/projects';
import Board from './pages/board';
import Profile from './pages/profile';

function App() {
  const { token } = useContext(TokenContext) || {};

  return (
    <TokenProvider>
      <Router>
        <Routes>
          {/* Always accessible */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route path="/projects" element={token ? <Projects /> : <Navigate to="/login" replace />} />
          <Route path="/boards/:id" element={token ? <Board /> : <Navigate to="/login" replace />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </TokenProvider>
  );
}

export default App;
