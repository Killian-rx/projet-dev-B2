// 📁 routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const commentController = require('../controllers/commentController');

router.use(auth);

// Obtenir tous les commentaires d'une carte
router.get('/cards/:cardId/comments', commentController.getCommentsByCard);

// Créer un commentaire pour une carte
router.post('/cards/:cardId/comments', commentController.createComment);

// Modifier un commentaire
router.put('/comments/:id', commentController.updateComment);

// Supprimer un commentaire
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
