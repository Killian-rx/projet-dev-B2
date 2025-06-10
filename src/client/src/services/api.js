const API_URL = "http://localhost:5000"; // Assurez-vous que cette URL correspond à celle du backend
const jsonHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: token ? `Bearer ${token}` : undefined,
});

// --- USERS ---
export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(userData),
  });
  return await res.json();
};

export const loginUser = async (userData) => {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            throw new Error(`Erreur HTTP: ${res.status}`);
        }

        const data = await res.json();
        console.log('Réponse de connexion:', data); // Log pour vérifier la réponse de l'API
        if (data.token) {
            console.log('Token reçu:', data.token); // Log pour vérifier le token reçu
            localStorage.setItem('token', data.token); // Stocke le token dans localStorage

            // Vérifiez immédiatement si le token est bien stocké
            const storedToken = localStorage.getItem('token');
            console.log('Token stocké dans localStorage:', storedToken);

            // Ajoutez une redirection ici si nécessaire
            // Exemple : window.location.href = '/dashboard';
        } else {
            console.error('Aucun token reçu après la connexion.');
        }
        return data;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        return { error: 'Erreur lors de la connexion au serveur.' };
    }
};

export const getUserProfile = async (token) => {
  try {
    console.log('Token utilisé pour getUserProfile:', token);
    const response = await fetch(`${API_URL}/user/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du profil utilisateur');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API getUserProfile:', error);
    return null;
  }
};

export const updateUserProfile = async (data, token) => {
  const res = await fetch(`${API_URL}/user/me`, {
    method: 'PUT',
    headers: jsonHeaders(token),
    body: JSON.stringify(data),
  });
  return await res.json();
};

// --- BOARDS ---
export const getBoards = async (token) => {
  const res = await fetch(`${API_URL}/boards`, { headers: jsonHeaders(token) });
  return await res.json();
};

export const getBoard = async (id, token) => {
  const res = await fetch(`${API_URL}/boards/${id}`, { headers: jsonHeaders(token) });
  return await res.json();
};

export const createBoard = async (boardData, token) => {
    try {
        const response = await fetch(`${API_URL}/boards`, { // Assurez-vous que l'URL correspond à la route backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(boardData),
        });
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la création du projet:', error);
        return { error: 'Erreur lors de la création du projet' };
    }
};

export const updateBoard = async (id, data, token) => {
  const res = await fetch(`${API_URL}/boards/${id}`, {
    method: "PUT",
    headers: jsonHeaders(token),
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteBoard = async (id, token) => {
  const res = await fetch(`${API_URL}/boards/${id}`, {
    method: "DELETE",
    headers: jsonHeaders(token),
  });
  return await res.json();
};

// --- LISTS ---
export const getListsByBoard = async (boardId, token) => {
  const res = await fetch(`${API_URL}/boards/${boardId}/lists`, {
    headers: jsonHeaders(token),
  });
  return await res.json();
};

export const createList = async (boardId, data, token) => {
  const res = await fetch(`${API_URL}/boards/${boardId}/lists`, {
    method: "POST",
    headers: jsonHeaders(token),
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const updateList = async (listId, data, token) => {
  const res = await fetch(`${API_URL}/lists/${listId}`, {
    method: "PUT",
    headers: jsonHeaders(token),
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteList = async (listId, token) => {
  const res = await fetch(`${API_URL}/lists/${listId}`, {
    method: "DELETE",
    headers: jsonHeaders(token),
  });
  return await res.json();
};

// --- CARDS ---
export const getCardsByList = async (listId, token) => {
  const res = await fetch(`${API_URL}/cards/lists/${listId}/cards`, { headers: jsonHeaders(token) });
  return await res.json();
};

export const createCard = async (listId, data, token) => {
  const res = await fetch(`${API_URL}/cards/lists/${listId}/cards`, {
    method: "POST",
    headers: jsonHeaders(token),
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const updateCard = async (cardId, data, token) => {
  const res = await fetch(`${API_URL}/cards/${cardId}`, {
    method: "PUT",
    headers: jsonHeaders(token),
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteCard = async (cardId, token) => {
  const res = await fetch(`${API_URL}/cards/${cardId}`, {
    method: "DELETE",
    headers: jsonHeaders(token),
  });
  return await res.json();
};

// --- COMMENTS ---
export const getCommentsByCard = async (cardId, token) => {
  const res = await fetch(`${API_URL}/comments/cards/${cardId}/comments`, {
    headers: jsonHeaders(token),
  });
  return await res.json();
};

export const createComment = async (cardId, data, token) => {
  const res = await fetch(`${API_URL}/comments/cards/${cardId}/comments`, {
    method: "POST",
    headers: jsonHeaders(token),
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const updateComment = async (commentId, data, token) => {
  const res = await fetch(`${API_URL}/comments/${commentId}`, {
    method: "PUT",
    headers: jsonHeaders(token),
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteComment = async (commentId, token) => {
  const res = await fetch(`${API_URL}/comments/${commentId}`, {
    method: "DELETE",
    headers: jsonHeaders(token),
  });
  return await res.json();
};

// --- LABELS ---
export const getLabelsByBoard = async (boardId, token) => {
  const res = await fetch(`${API_URL}/labels/boards/${boardId}/labels`, {
    headers: jsonHeaders(token),
  });
  return await res.json();
};
export const createLabel = async (boardId, data, token) => {
  const res = await fetch(`${API_URL}/labels/boards/${boardId}/labels`, {
    method: "POST",
    headers: jsonHeaders(token),
    body: JSON.stringify(data),
  });
  return await res.json();
};

// --- ASSIGN / REMOVE LABEL ON CARD ---
export const assignLabelToCard = async (cardId, labelId, token) => {
  const res = await fetch(`${API_URL}/cards/${cardId}/labels/${labelId}`, {
    method: "POST",
    headers: jsonHeaders(token),
  });
  return await res.json();
};
export const removeLabelFromCard = async (cardId, labelId, token) => {
  const res = await fetch(`${API_URL}/cards/${cardId}/labels/${labelId}`, {
    method: "DELETE",
    headers: jsonHeaders(token),
  });
  return await res.json();
};

// --- ROLES ---
export const getRoles = async (token) => {
  const res = await fetch(`${API_URL}/roles`, { headers: jsonHeaders(token) });
  return await res.json();
};

export const createRole = async (data, token) => {
  const res = await fetch(`${API_URL}/roles`, {
    method: "POST",
    headers: jsonHeaders(token),
    body: JSON.stringify(data),
  });
  return await res.json();
};

// --- MEMBERS ---
export const getBoardMembers = async (boardId, token) => {
  const res = await fetch(`${API_URL}/boards/${boardId}/members`, { headers: jsonHeaders(token) });
  return await res.json();
};

export const addBoardMember = async (boardId, data, token) => {
  const res = await fetch(`${API_URL}/boards/${boardId}/members`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify(data),
  });
  return await res.json();
};

// --- PROJECTS ---
export const getProjectDetails = async (id) => {
  try {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des détails du projet');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API getProjectDetails:', error);
    throw error;
  }
};
