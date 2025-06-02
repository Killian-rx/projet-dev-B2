const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import du middleware d'authentification

// Route pour créer un projet (protégée)
router.post('/projects', authMiddleware, projectController.createBoard);

// Route pour récupérer tous les projets
router.get('/projects', authMiddleware, projectController.getBoards);

module.exports = router;
