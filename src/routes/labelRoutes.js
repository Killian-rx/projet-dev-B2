// 📁 routes/labelRoutes.js
const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');

// Obtenir tous les labels d'un board
router.get('/boards/:boardId/labels', labelController.getLabelsByBoard);

// Créer un label dans un board
router.post('/boards/:boardId/labels', labelController.createLabel);

// Modifier un label
router.put('/:id', labelController.updateLabel);

// Supprimer un label
router.delete('/:id', labelController.deleteLabel);

module.exports = router;
