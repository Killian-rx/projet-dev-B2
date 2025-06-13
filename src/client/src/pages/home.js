import React from 'react';
import { useNavigate } from 'react-router-dom';
// Static landing page, no auth logic for now
import '../css/home.css';
import HomeNavbar from '../components/navbar_home';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <HomeNavbar />
      <div className="home-container">
        <div className="home-hero">
          <h1>Organisez vos idées, collaborez en toute simplicité</h1>
          <button className="home-cta" onClick={() => navigate('/login')}>Essayer maintenant →</button>
        </div>
        <p className="home-subtitle">Glissez, déposez, collaborez. Aussi simple que ça</p>
      </div>
    </>
  );
}

export default Home;
