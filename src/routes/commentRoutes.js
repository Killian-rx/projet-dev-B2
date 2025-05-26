// 📁 routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Obtenir tous les commentaires d'une carte
router.get('/cards/:cardId/comments', commentController.getCommentsByCard);

// Créer un commentaire pour une carte
router.post('/cards/:cardId/comments', commentController.createComment);

// Modifier un commentaire
router.put('/:id', commentController.updateComment);

// Supprimer un commentaire
router.delete('/:id', commentController.deleteComment);

module.exports = router;
