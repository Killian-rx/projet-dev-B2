import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { getBoard, getListsByBoard, createList, getCardsByList, createCard, getBoardMembers, createBoard, updateList, deleteList, updateCard, deleteCard } from '../services/api';  // <-- Added updateCard and deleteCard
import '../css/board.css'; // Assurez-vous d'avoir ce fichier CSS pour le style
import ReactDOM from 'react-dom';  // <-- add this line

function Board() {
  const { id } = useParams();
  const [showCreatePopup, setShowCreatePopup] = useState(false); // État pour afficher la pop-up
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [creatingProject, setCreatingProject] = useState(false);
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
  const [dropdown, setDropdown] = useState({ visible: false, x: 0, y: 0, listId: null });
  const [cardDropdown, setCardDropdown] = useState({ visible: false, x: 0, y: 0, cardId: null });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const images = [
    '/assets/boards/img1.jpg',
    '/assets/boards/img2.jpg',
    '/assets/boards/img3.jpg',
    '/assets/boards/img4.jpg',
  ]; // Liste des images disponibles

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

  const handleCreateProject = async () => {
    if (!newProjectName || !selectedImage) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    setCreatingProject(true);
    try {
      const token = localStorage.getItem('token');
      const data = await createBoard({ name: newProjectName, image: selectedImage }, token);
      if (data.error) {
        alert(data.error);
      } else {
        alert('Projet créé avec succès !');
        setShowCreatePopup(false);
        setNewProjectName('');
        setSelectedImage('');
      }
    } catch {
      alert('Erreur lors de la création du projet.');
    } finally {
      setCreatingProject(false);
    }
  };

  // Handler for list update
  const handleEditList = async (listId) => {
    const newName = window.prompt('Entrez le nouveau nom de la liste :');
    if (!newName) return;
    try {
      const updatedList = await updateList(listId, { name: newName }, token);
      if (!updatedList.error) {
        setLists((prevLists) => prevLists.map((list) => list.id === listId ? updatedList : list));
      }
    } catch (error) {
      console.error('Erreur lors de la modification de la liste:', error);
    }
  };

  // Handler for list deletion
  const handleDeleteList = async (listId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette liste ?')) return;
    try {
      const response = await deleteList(listId, token);
      if (!response.error) {
        setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
        setCardsByList((prevCards) => {
          const updatedCards = { ...prevCards };
          delete updatedCards[listId];
          return updatedCards;
        });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la liste:', error);
    }
  };

  // Change the handleShowDropdown function as follows:
  const handleShowDropdown = (e, listId) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    console.log("Dropdown triggered for list:", listId, rect); // Debug log
    setDropdown({
      visible: true,
      x: rect.left + window.scrollX, 
      y: rect.bottom + window.scrollY, // position below the button
      listId: listId,
    });
  };

  const handleCloseDropdown = () => setDropdown({ visible: false, x: 0, y: 0, listId: null });

  useEffect(() => {
    const onClickOutside = () => {
      if (dropdown.visible) handleCloseDropdown();
    };
    if (dropdown.visible) document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, [dropdown.visible]);

  // Replace the stub card handlers with the following:
  // Import updateCard and deleteCard from the API module in the imports section:
  // ...existing imports...
  // Ensure your import line now includes updateCard and deleteCard:
  // import { getBoard, getListsByBoard, createList, getCardsByList, createCard, getBoardMembers, createBoard, updateList, deleteList, updateCard, deleteCard } from '../services/api';

  const handleEditCard = async (cardId) => {
    const newTitle = window.prompt('Entrez le nouveau titre pour la carte:');
    if (!newTitle) return;
    try {
      await updateCard(cardId, { title: newTitle }, token);
      // Reload the page to fetch updated data
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la modification de la carte", error);
      alert('Une erreur est survenue lors de la modification de la carte.');
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) return;
    try {
      await deleteCard(cardId, token);
      // Reload the page to reflect deletion
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la suppression de la carte", error);
      alert('Une erreur est survenue lors de la suppression de la carte.');
    }
  };

  // Add new handlers for card dropdown:
  const handleShowCardDropdown = (e, cardId) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setCardDropdown({
      visible: true,
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
      cardId: cardId,
    });
  };

  const handleCloseCardDropdown = () => setCardDropdown({ visible: false, x: 0, y: 0, cardId: null });

  useEffect(() => {
    const onClickOutsideCard = () => {
      if (cardDropdown.visible) handleCloseCardDropdown();
    };
    if (cardDropdown.visible) document.addEventListener('click', onClickOutsideCard);
    return () => document.removeEventListener('click', onClickOutsideCard);
  }, [cardDropdown.visible]);

  if (loading) return <p>Chargement du projet...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div
      className="board-container"
      style={{
        backgroundImage: `url(${board?.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Navbar>
        <button className="create-project-button" onClick={() => setShowCreatePopup(true)}>
          Créer un projet
        </button>
      </Navbar>
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

      <div className="project-navbar">
        <div className="project-navbar-left">
          <h2 className="project-name">{board.name}</h2>
        </div>
        <div className="project-navbar-right">
          <div className="project-members">
            {members.map((m) => (
              <span key={m.user.id} className="member-initial">
                {m.user.name.charAt(0).toUpperCase()}
                <div className="member-info">
                  {m.user.name} ({m.role.name})
                </div>
              </span>
            ))}
          </div>
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
        {lists.map((list) => (
          <div key={list.id} className="list-column">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{list.name}</h3>
              <div>
                <button
                  className="edit-button"
                  onClick={(e) => handleShowDropdown(e, list.id)}
                >
                  ⋯
                </button>
                {/* Remove inline dropdown from here */}
              </div>
            </div>
            {/* Cards */}
            <div>
              {(cardsByList[list.id] || []).map(card => (
                <div key={card.id} className="card-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{card.title}</span>
                    <button className="edit-button" onClick={(e) => handleShowCardDropdown(e, card.id)}>
                      ⋯
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Add card placeholder/option */}
            <button onClick={()=>handleAddCard(list.id)} className="add-card-button">+ Ajouter une carte</button>
          </div>
        ))}
        <button
          className="add-list-column-button"
          onClick={handleShowListForm}
        >
          + Ajouter une autre liste
        </button>
      </div>
      {/* Render dropdown via portal */}
      {dropdown.visible && ReactDOM.createPortal(
        <div className="dropdown-menu" 
          style={{ 
            position: 'fixed', 
            top: dropdown.y + 'px', 
            left: dropdown.x + 'px',
            display: 'block' // force the dropdown to be visible
          }}
        >
          <button onClick={() => { handleEditList(dropdown.listId); handleCloseDropdown(); }}>
            Modifier
          </button>
          <button onClick={() => { handleDeleteList(dropdown.listId); handleCloseDropdown(); }}>
            Supprimer
          </button>
        </div>,
        document.body
      )}
      {/* Render card dropdown via portal */}
      {cardDropdown.visible && ReactDOM.createPortal(
        <div className="dropdown-menu" 
          style={{ 
            position: 'fixed', 
            top: cardDropdown.y + 'px', 
            left: cardDropdown.x + 'px',
            display: 'block' // force visibility
          }}
        >
          <button onClick={() => { handleEditCard(cardDropdown.cardId); handleCloseCardDropdown(); }}>
            Modifier
          </button>
          <button onClick={() => { handleDeleteCard(cardDropdown.cardId); handleCloseCardDropdown(); }}>
            Supprimer
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}

export default Board;
