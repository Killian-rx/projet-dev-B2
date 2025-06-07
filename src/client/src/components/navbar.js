import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile } from '../services/api';
import '../css/navbar.css';


function NavBar({ onCreateClick }) { // Ajoutez une prop pour gérer le clic sur "Créer"
  const [username, setUsername] = useState(''); // État pour stocker le pseudo

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Récupère le token depuis le localStorage
        const data = await getUserProfile(token); // Appelle l'API pour récupérer le profil utilisateur
        if (data && data.name) {
          setUsername(data.name); // Met à jour le pseudo
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const firstLetter = username.charAt(0).toUpperCase(); // Récupère la première lettre du pseudo

  return (
    <nav className="navbar">
      <div className="navbar-left"> {/* Conteneur pour le logo et les liens */}
        <div className="navbar-logo">
          <span className="navbar-logo-text">Organix</span>
        </div>
        <div className="navbar-links">
          <Link to="/projects">Mes projets</Link>
          <Link to="/profile">Mon profil</Link>
        </div>
        <button className="navbar-create-button" onClick={onCreateClick}>
          Créer
        </button>
      </div>
      <div className="navbar-profile">
        <button className="navbar-profile-button">
          <span>{firstLetter}</span> {/* Affiche la première lettre */}
        </button>
        <div className="navbar-profile-menu">
          <Link to="/profile">Voir le profil</Link>
          <Link to="/logout">Déconnexion</Link>
          <Link to="/switch-account">Changer de compte</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;