import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getBoards, createBoard, getBoardMembers, updateBoard, deleteBoard, shareBoard } from '../services/api';
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
  const [dropdown, setDropdown] = useState({ visible:false, x:0, y:0, boardId:null });

  // Charge la liste des récents au montage
  useEffect(() => {
    const rp = JSON.parse(localStorage.getItem('recentProjects') || '[]');
    setRecent(rp);
  }, []);

  // définition en amont pour être visible dans useEffect
  const fetchBoards = async () => {
    try {
      const data = await getBoards(token);
      console.log('Données reçues du backend:', data); // tu confirmes ici
      const boardsWithMembers = await Promise.all(
        data.map(async b => {
          const members = await getBoardMembers(b.id, token);
          return { ...b, members: Array.isArray(members) ? members : [] };
        })
      );
      setBoards(boardsWithMembers);
      const rp = JSON.parse(localStorage.getItem('recentProjects') || '[]');
      setRecent(rp.map(rpBoard =>
        boardsWithMembers.find(b => b.id === rpBoard.id) || rpBoard
      ));
    } catch {
      setError('Erreur lors du chargement des projets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirige si le token est manquant
      return;
    }
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

        // Aller chercher les membres pour ce board (normalement l'utilisateur créateur)
        const members = await getBoardMembers(data.id, token);

        // Ajouter le board avec les membres enrichis :
        await fetchBoards();

        // MAJ projets récents si besoin
        updateRecent({ ...data, members: Array.isArray(members) ? members : [] });

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

  // affiche le menu 3-points
  const handleShowDropdown = (e, boardId) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();

    const viewportHeight = window.innerHeight;
    const menuHeight = 100; // approx hauteur menu
    const top = Math.min(rect.bottom + window.scrollY, viewportHeight - menuHeight);

    console.log('Dropdown coords:', rect.left + window.scrollX, top);

    setDropdown({
      visible: true,
      x: rect.left + window.scrollX,
      y: top,
      boardId
    });
  };

  const handleCloseDropdown = () => setDropdown({ visible:false, x:0, y:0, boardId:null });

  // renommer un projet
  const handleEditProject = async () => {
    const newName = window.prompt('Entrez le nouveau nom du projet :');
    if (!newName) return handleCloseDropdown();
    const res = await updateBoard(dropdown.boardId, { name: newName }, token);
    if (!res.error) {
      setBoards(prev => prev.map(b => b.id===dropdown.boardId ? { ...b, name:newName } : b));
    }
    handleCloseDropdown();
  };

  // supprimer un projet
  const handleDeleteProject = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) 
      return handleCloseDropdown();
    await deleteBoard(dropdown.boardId, token);

    // retirer du state "boards"
    setBoards(prev => prev.filter(b => b.id !== dropdown.boardId));

    // retirer de "recent" et de localStorage
    setRecent(prev => {
      const newRecent = prev.filter(b => b.id !== dropdown.boardId);
      localStorage.setItem('recentProjects', JSON.stringify(newRecent));
      return newRecent;
    });

    handleCloseDropdown();
  };

  // nouveau handler partage
  const handleShareProject = async () => {
    const email = window.prompt("Entrez l'email de l'utilisateur à ajouter :");
    if (!email) return handleCloseDropdown();
    try {
      const newMember = await shareBoard(dropdown.boardId, email, token);
      if (newMember.error) {
        alert(`Erreur : ${newMember.error}`);
      } else {
        setBoards(prev =>
          prev.map(b =>
            b.id === dropdown.boardId
              ? { ...b, members: [...(b.members||[]), newMember] }
              : b
          )
        );
        alert('Utilisateur ajouté en tant que membre.');
      }
    } catch (err) {
      alert('Erreur lors du partage.');
    } finally {
      handleCloseDropdown();
    }
  };

  // fermer menu au clic hors
  useEffect(() => {
    const onClickOutside = () => { if (dropdown.visible) handleCloseDropdown(); };
    if (dropdown.visible) document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, [dropdown.visible]);


  if (loading) return <p>Chargement des projets...</p>;
  if (error)   return <p>❌ {error}</p>;

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
                    {(b.members || []).map(m => {
                      const initial = m.user?.name?.charAt(0).toUpperCase() || '';
                      return (
                        <span key={m.user?.id || Math.random()} className="member-initial">
                          {initial}
                          <div className="member-info">
                            {m.user?.name} ({m.role?.name})
                          </div>
                        </span>
                      );
                    })}
                  </div>
                  <button
                    className="more-options"
                    onClick={e => {
                       e.stopPropagation();
                       handleShowDropdown(e, b.id);
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
                  {(board.members || []).map(m => {
                    const initial = m.user?.name?.charAt(0).toUpperCase() || '';
                    return (
                      <span key={m.user?.id || Math.random()} className="member-initial">
                        {initial}
                      </span>
                    );
                  })}
                </div>
                <button
                  className="more-options"
                  onClick={e => handleShowDropdown(e, board.id)}
                >
                  ...
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {dropdown.visible && ReactDOM.createPortal(
        <div
          className="dropdown-menu"
          style={{
            position: 'fixed',
            top: dropdown.y + 'px',
            left: dropdown.x + 'px',
            zIndex: 99999,
            backgroundColor: '#fff',
            border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: '4px',
            padding: '8px 0',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          <button onClick={handleShareProject}>Partager</button>
          <button onClick={handleEditProject}>Modifier</button>
          <button onClick={handleDeleteProject}>Supprimer</button>
        </div>,
        document.body
      )}
    </div>
  );
}

export default Projects;
