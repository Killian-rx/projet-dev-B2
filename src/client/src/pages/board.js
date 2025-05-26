import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBoard, getListsByBoard, createList, getCardsByList, createCard, getBoardMembers } from '../services/api';
import '../css/board.css'; // Assurez-vous d'avoir ce fichier CSS pour le style

function Board() {
  const { id } = useParams();
  // States for adding a new list
  const [showListForm, setShowListForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [addingList, setAddingList] = useState(false);
  const [listError, setListError] = useState(null);
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardsByList, setCardsByList] = useState({});
  const [members, setMembers] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchData = async () => {
      try {
        const b = await getBoard(id, token);
        if (b.error) {
          setError(b.error);
        } else {
          setBoard(b);
        }
        const l = await getListsByBoard(id, token);
        if (l.error) {
          setError(l.error);
        } else {
          setLists(l);
          // fetch cards for each list
          const map = {};
          for (const lst of l) {
            const cards = await getCardsByList(lst.id, token); // now matches /cards/lists/:listId/cards
            map[lst.id] = Array.isArray(cards) ? cards : [];
          }
          setCardsByList(map);
          // fetch members
          const mem = await getBoardMembers(id, token);
          setMembers(Array.isArray(mem) ? mem : []);
        }
      } catch {
        setError('Erreur lors du chargement du projet');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token, navigate]);

  // Handlers for list creation
  const handleShowListForm = () => setShowListForm(true);
  const handleCancelList = () => { setShowListForm(false); setNewListName(''); setListError(null); };
  const handleSubmitList = async (e) => {
    e.preventDefault(); setAddingList(true);
    try {
      const data = await createList(id, { name: newListName }, token);
      if (data.error) setListError(data.error);
      else {
        setLists(prev => [...prev, data]);
        setCardsByList(prev => ({ ...prev, [data.id]: [] }));
        handleCancelList();
      }
    } catch {
      setListError('Erreur lors de la création de la liste');
    } finally { setAddingList(false); }
  };

  // Handler for adding a card
  const handleAddCard = async (listId) => {
    const title = window.prompt('Titre de la carte :');
    if (!title) return;
    const card = await createCard(listId, { title }, token);
    if (!card.error) {
      setCardsByList(prev => ({
        ...prev,
        [listId]: [...(prev[listId]||[]), card]
      }));
    }
  };

  if (loading) return <p>Chargement du projet...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div className="board-container">
      {/* Header */}
      <div className="board-header">
        <h2>{board.name}</h2>
        <div className="board-members">
          {members.map(m => (
            <span key={m.user.id}>
              {m.user.name} ({m.role.name})
            </span>
          ))}
        </div>
      </div>
      {/* New List Form */}
      {showListForm && (
        <form onSubmit={handleSubmitList} className="new-list-form">
          <input type="text" value={newListName} onChange={e=>setNewListName(e.target.value)} placeholder="Nom de la liste" required style={{ flex: '1' }}/>
          <button type="submit" disabled={addingList} className="add-list-button">{addingList ? '...' : 'Ajouter'}</button>
          <button type="button" onClick={handleCancelList}>Annuler</button>
          {listError && <span style={{ color:'red' }}>{listError}</span>}
        </form>
      )}
      {/* Lists Container */}
      <div className="lists-container">
        {lists.map(list => (
          <div key={list.id} className="list-column">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{list.name}</h3>
              <button className="edit-button">⋯</button>
            </div>
            {/* Cards */}
            <div>
              {(cardsByList[list.id] || []).map(card => (
                <div key={card.id} className="card-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{card.title}</span>
                    <button className="edit-button">⋯</button>
                  </div>
                </div>
              ))}
            </div>
            {/* Add card placeholder/option */}
            <button onClick={()=>handleAddCard(list.id)} className="add-card-button">+ Ajouter une carte</button>
          </div>
        ))}
        <div className="add-list-column">
          <button
            className="add-list-column-button"
            onClick={handleShowListForm}
          >
            + Ajouter une liste
          </button>
        </div>
      </div>
    </div>
  );
}

export default Board;
