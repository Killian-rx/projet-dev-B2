import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile, createBoard } from '../services/api'; // ← import createBoard
import '../css/navbar.css';

function NavBar({ onProjectCreated }) {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null); // stocke l’ID de l’utilisateur
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [creatingProject, setCreatingProject] = useState(false);

  const images = [
    '/assets/boards/img1.jpg',
    '/assets/boards/img2.jpg',
    '/assets/boards/img3.jpg',
    '/assets/boards/img4.jpg',
  ]; // Liste des images disponibles

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Récupère le token depuis le localStorage
        const data = await getUserProfile(token); // Appelle l'API pour récupérer le profil utilisateur
        if (data?.name) setUsername(data.name);
        if (data?.id) setUserId(data.id);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
      }
    };

    fetchUserProfile();
  }, []); // ne pas ajouter setUserId en dépendance

  const handleCreateProject = async () => {
    if (!newProjectName || !selectedImage) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    setCreatingProject(true);
    try {
      const token = localStorage.getItem('token');
      const data = await createBoard(
        { name: newProjectName, image: selectedImage },
        token
      ); // ← utilise createBoard
      if (data.error) {
        alert(data.error);
      } else {
        alert('Projet créé avec succès !');
        setShowCreatePopup(false);
        setNewProjectName('');
        setSelectedImage('');
        onProjectCreated?.(data);
      }
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      alert('Erreur lors de la création du projet.');
    } finally {
      setCreatingProject(false);
    }
  };

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
        <button className="navbar-create-button" onClick={() => setShowCreatePopup(true)}>
          Créer
        </button>
      </div>
      <div className="navbar-profile">
        <button className="navbar-profile-button">
          <span>{firstLetter}</span> {/* Affiche la première lettre */}
        </button>
        <div className="navbar-profile-menu">
          <Link to="/profile">Voir le profil</Link>
          <Link to="/login">Déconnexion</Link>
          <Link to="/login">Changer de compte</Link>
        </div>
      </div>

      {showCreatePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Créer un nouveau projet</h2>
            <input
              type="text"
              placeholder="Nom du projet"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <div className="image-gallery">
              <p>Choisissez une image :</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {images.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt="Gallery"
                    onClick={() => setSelectedImage(image)}
                    style={{
                      width: '50px',
                      height: '50px',
                      border: selectedImage === image ? '2px solid blue' : '1px solid gray',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>
            <button onClick={handleCreateProject} disabled={creatingProject}>
              {creatingProject ? 'Création...' : 'Créer'}
            </button>
            <button onClick={() => setShowCreatePopup(false)}>Annuler</button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;