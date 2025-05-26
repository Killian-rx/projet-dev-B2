import React, { useEffect, useState } from 'react';
import { getBoards, createBoard } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../css/projects.css';

function Projects() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [addError, setAddError] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await getBoards(token);
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
  const handleCancel = () => { setShowForm(false); setNewName(''); setAddError(null); };
  const handleSubmitNew = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const data = await createBoard({ name: newName }, token);
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
