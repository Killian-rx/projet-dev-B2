// filepath: src/client/src/components/NavBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="navbar-logo-text">Organix</span>
      </div>
      {/* Inline links for desktop */}
      <div className="navbar-links">
        <Link to="/projects">En savoir plus</Link>
        <Link to="/profile">A propos</Link>
      </div>

      <button className="navbar-auth">
        <Link to="/login" className='navbar-auth-link'>Connexion</Link>
      </button>

      {/* Hamburger for mobile */}
      <div className="navbar-menu" onClick={() => setOpen(!open)}>☰</div>
      {open && (
        <div className="dropdown-menu">
          <Link to="/projects" onClick={() => setOpen(false)}>Mes projets</Link>
          <Link to="/projects" onClick={() => setOpen(false)}>Nouveau projet</Link>
          <Link to="/profile" onClick={() => setOpen(false)}>Profil</Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
