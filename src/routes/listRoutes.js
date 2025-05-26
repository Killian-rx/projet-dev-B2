// 📁 routes/listRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const listController = require('../controllers/listController');

// Apply auth to all routes
router.use(auth);

// Obtenir toutes les listes d'un board
router.get('/boards/:boardId/lists', listController.getListsByBoard);

// Créer une liste dans un board
router.post('/boards/:boardId/lists', listController.createList);

// Modifier une liste
router.put('/lists/:id', listController.updateList);

// Supprimer une liste
router.delete('/lists/:id', listController.deleteList);

module.exports = router;
