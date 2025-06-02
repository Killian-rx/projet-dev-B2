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
        if (data.token) localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        return { error: 'Erreur lors de la connexion au serveur.' };
    }
};

export const getUserProfile = async (token) => {
  const res = await fetch(`${API_URL}/user/me`, {
    headers: jsonHeaders(token),
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
        const response = await fetch(`${API_URL}/api/projects`, { // Assurez-vous que l'URL correspond à la route backend
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
  const res = await fetch(`${API_URL}/cards/${cardId}/comments`, {
    headers: jsonHeaders(token),
  });
  return await res.json();
};

export const createComment = async (cardId, data, token) => {
  const res = await fetch(`${API_URL}/cards/${cardId}/comments`, {
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
  const res = await fetch(`${API_URL}/boards/${boardId}/labels`, {
    headers: jsonHeaders(token),
  });
  return await res.json();
};

export const createLabel = async (boardId, data, token) => {
  const res = await fetch(`${API_URL}/boards/${boardId}/labels`, {
    method: "POST",
    headers: jsonHeaders(token),
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const updateLabel = async (labelId, data, token) => {
  const res = await fetch(`${API_URL}/labels/${labelId}`, {
    method: "PUT",
    headers: jsonHeaders(token),
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteLabel = async (labelId, token) => {
  const res = await fetch(`${API_URL}/labels/${labelId}`, {
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
