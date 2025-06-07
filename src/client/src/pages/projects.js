import React, { useEffect, useState } from 'react';
import { getBoards, createBoard } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar'; // Importez le composant Navbar
import '../css/projects.css';// Assurez-vous que le chemin est correct pour l'image par défaut

function Projects() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedImage, setSelectedImage] = useState(''); // État pour l'image sélectionnée
  const [addError, setAddError] = useState(null);
  const [adding, setAdding] = useState(false);

  const images = [
    '/assets/boards/img1.jpg',
    '/assets/boards/img2.jpg',
    '/assets/boards/img3.jpg',
    '/assets/boards/img4.jpg',
    '/assets/boards/img5.jpg',
    '/assets/boards/img6.jpg',
    '/assets/boards/img7.jpg',
  ]; // Liste des chemins d'images locales

  useEffect(() => {
    const fetchBoards = async () => {
        try {
            const data = await getBoards(token);
            console.log('Données reçues du backend:', data); // Vérifiez que 'image' est présent
            if (data.error) {
                setError(data.error);
            } else {
                setBoards(data);
            }
        } catch (err) {
            setError('Erreur lors du chargement des projets');
        }
        setLoading(false);
    };
    fetchBoards();
  }, [token]);

  const handleCreateClick = () => setShowForm(true);
  const handleCancel = () => { 
    setShowForm(false); 
    setNewName(''); 
    setSelectedImage(''); // Réinitialise l'image sélectionnée
    setAddError(null); 
  };
  const handleSubmitNew = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const userId = localStorage.getItem('userId'); // Récupère l'ID de l'utilisateur depuis le stockage local
      if (!userId) {
        throw new Error('Utilisateur non identifié.');
      }
      const data = await createBoard({ name: newName, image: selectedImage, owner_id: userId }, token); // Inclure owner_id
      if (data.error) {
        setAddError(data.error);
      } else {
        setBoards((prev) => [...prev, data]);
        handleCancel();
      }
    } catch (err) {
      setAddError(err.message || 'Erreur lors de la création');
    } finally {
      setAdding(false);
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image); // Met à jour l'image sélectionnée
  };

  const handleProjectCreated = (newProject) => {
    setBoards((prevBoards) => [...prevBoards, newProject]); // Ajoute le nouveau projet à la liste
  };

  if (loading) return <p>Chargement des projets...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div className="projects-container">
      <Navbar onCreateClick={handleCreateClick} onProjectCreated={handleProjectCreated} />
      {showForm && (
        <form onSubmit={handleSubmitNew} style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Nom du projet"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            style={{ marginRight: '0.5rem' }}
          />
          <div className="image-gallery">
            <p>Choisissez une image :</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {images.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt="Gallery"
                  onClick={() => handleImageSelect(image)}
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
          <button type="submit" disabled={adding}>
            {adding ? 'Création...' : 'Créer'}
          </button>
          <button type="button" onClick={handleCancel} style={{ marginLeft: '0.5rem' }}>
            Annuler
          </button>
          {addError && <p style={{ color: 'red' }}>❌ {addError}</p>}
        </form>
      )}
      <div className="projects-header">
        <h1>Liste des projets</h1>
      </div>
      {boards.length === 0 ? (
        <p>Aucun projet trouvé.</p>
      ) : (
        <div className="projects-list">
          <div className="cards-container">
            {boards.map((board) => (
              <div
                className="project-card"
                key={board.id}
                onClick={() => navigate(`/boards/${board.id}`)} // Navigue vers la page du projet
                style={{ cursor: 'pointer' }} // Ajoute un curseur pour indiquer que la carte est cliquable
              >
                <div
                  className="project-card-image"
                  style={{ backgroundImage: `url(${board.image})` }}
                >
                  <div className="project-card-title">
                    <h3>{board.name}</h3>
                  </div>
                </div>
                <div className="project-card-footer">
                  <div className="project-members">
                    {board.members?.map((member) => (
                      <span key={member.id} className="member-initial">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <button
                    className="more-options"
                    onClick={(e) => {
                      e.stopPropagation(); // Empêche la navigation si le bouton est cliqué
                      console.log('Options clicked');
                    }}
                  >
                    ...
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
