import React, { useEffect, useState } from 'react';
import { getBoards, createBoard } from '../services/api';
import { useNavigate } from 'react-router-dom';
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
      const data = await createBoard({ name: newName, image: selectedImage }, token); // Inclure l'image sélectionnée
      if (data.error) {
        setAddError(data.error);
      } else {
        setBoards(prev => [...prev, data]);
        handleCancel();
      }
    } catch {
      setAddError('Erreur lors de la création');
    } finally {
      setAdding(false);
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image); // Met à jour l'image sélectionnée
  };

  if (loading) return <p>Chargement des projets...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div className="projects-container">
      <button onClick={handleCreateClick} style={{ marginBottom: '1rem' }}>Créer un nouveau projet</button>
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
          <ul>
            {boards.map((board) => (
              <li
                key={board.id}
                onClick={() => navigate(`/boards/${board.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={board.image} // Utilise directement le champ 'image' renvoyé par le backend
                  alt={board.name}
                  style={{ width: '50px', height: '50px', marginRight: '10px' }}
                />
                {board.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Projects;
