// 📁 routes/cardRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const cardController = require('../controllers/cardController');
const cardLabelController = require('../controllers/cardLabelController');

router.use(auth);

// CRUD des cartes
router.get('/lists/:listId/cards', cardController.getCardsByList);
router.post('/lists/:listId/cards', cardController.createCard);
router.put('/:id', cardController.updateCard);
router.delete('/:id', cardController.deleteCard);

// Assignation d'un utilisateur à une carte
router.put('/:id/assign/:userId', cardController.assignUserToCard);

// Assign a label to a card
router.post('/:cardId/labels/:labelId', cardLabelController.assignLabel);

// Remove a label from a card
router.delete('/:cardId/labels/:labelId', cardLabelController.removeLabel);

module.exports = router;
