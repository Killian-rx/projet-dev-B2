// src/App.js
import React, { useState } from 'react';
import './App.css';
import Register from './pages/register';
import Login from './pages/login';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="App">
      <h1>Welcome to Our App</h1>
      {isLogin ? (
        <Login />
      ) : (
        <Register />
      )}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Go to Register' : 'Go to Login'}
      </button>
    </div>
  );
}

export default App;
