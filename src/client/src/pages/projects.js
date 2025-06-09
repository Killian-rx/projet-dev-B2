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
  const [recent, setRecent] = useState([]);

  // Charge la liste des récents au montage
  useEffect(() => {
    const rp = JSON.parse(localStorage.getItem('recentProjects') || '[]');
    setRecent(rp);
  }, []);

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirige si le token est manquant
      return;
    }
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
  }, [token, navigate]);

  // Met à jour les projets récents
  const updateRecent = (board) => {
    setRecent(prev => {
      const nxt = [board, ...prev.filter(b => b.id !== board.id)].slice(0, 5);
      localStorage.setItem('recentProjects', JSON.stringify(nxt));
      return nxt;
    });
  };

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

      {/* Projets récents */}
      {recent.length > 0 && (
        <div className="projects-section">
          <div className="projects-header">
            <h1>Projets récents</h1>
          </div>
          <div className="cards-container">
            {recent.map(b => (
              <div
                className="project-card"
                key={b.id}
                onClick={() => { updateRecent(b); navigate(`/boards/${b.id}`); }}
              >
                <div
                  className="project-card-image"
                  style={{ backgroundImage: `url(${b.image})` }}
                >
                  <div className="project-card-title">
                    <h3>{b.name}</h3>
                  </div>
                </div>
                <div className="project-card-footer">
                  <div className="project-members">
                    {b.members?.map((member) => (
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

      {/* Tous les projets */}
      <div className="projects-section">
        <div className="projects-header">
          <h1>Liste des projets</h1>
        </div>
        <div className="cards-container">
          {boards.map(board => (
            <div
              className="project-card"
              key={board.id}
              onClick={() => { updateRecent(board); navigate(`/boards/${board.id}`); }}
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
    </div>
  );
}

export default Projects;
