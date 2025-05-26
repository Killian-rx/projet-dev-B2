// 📁 routes/listRoutes.js
const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

// Obtenir toutes les listes d'un board
router.get('/boards/:boardId/lists', listController.getListsByBoard);

// Créer une liste dans un board
router.post('/boards/:boardId/lists', listController.createList);

// Modifier une liste
router.put('/:id', listController.updateList);

// Supprimer une liste
router.delete('/:id', listController.deleteList);

module.exports = router;
