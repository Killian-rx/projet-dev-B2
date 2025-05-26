// 📁 routes/cardRoutes.js
const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

// CRUD des cartes
router.get('/lists/:listId/cards', cardController.getCardsByList);
router.post('/lists/:listId/cards', cardController.createCard);
router.get('/:id', cardController.getCardById);
router.put('/:id', cardController.updateCard);
router.delete('/:id', cardController.deleteCard);

// Assignation d'un utilisateur à une carte
router.put('/:id/assign/:userId', cardController.assignUserToCard);

// Gestion des labels sur une carte
router.post('/:id/labels/:labelId', cardController.addLabelToCard);
router.delete('/:id/labels/:labelId', cardController.removeLabelFromCard);

module.exports = router;
