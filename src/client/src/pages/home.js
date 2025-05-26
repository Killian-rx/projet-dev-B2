import React from 'react';
// Static landing page, no auth logic for now
import '../css/home.css';
import HomeNavbar from '../components/navbar_home';

function Home() {
  return (
    <>
      <HomeNavbar />
      <div className="home-container">
        <div className="home-hero">
          <h1>Organisez vos idées, collaborez en toute simplicité</h1>
          <button className="home-cta">Essayer maintenant →</button>
        </div>
        <p className="home-subtitle">Glissez, déposez, collaborez. Aussi simple que ça</p>
      </div>
    </>
  );
}

export default Home;
