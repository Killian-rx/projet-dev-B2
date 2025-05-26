import React from 'react';
// Static landing page, no auth logic for now
import '../css/home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Organisez vos idées, collaborez en toute simplicité</h1>
        <button className="home-cta">Essayer maintenant →</button>
      </div>
      <p className="home-subtitle">Glissez, déposez, collaborez. Aussi simple que ça</p>
    </div>
  );
}

export default Home;
