// 📁 routes/boardRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const boardController = require('../controllers/boardController');
const labelController = require('../controllers/labelController'); // <--- ajouté

// Apply auth to all board routes
router.use(auth);

// CRUD des boards
router.get('/', boardController.getAllBoards);
router.get('/:id', boardController.getBoardById);
router.post('/', boardController.createBoard);
router.put('/:id', boardController.updateBoard);
router.delete('/:id', boardController.deleteBoard);

// Gestion des membres
router.get('/:id/members', boardController.getBoardMembers);
router.post('/:id/members', boardController.addBoardMember);
router.delete('/:id/members/:userId', boardController.removeBoardMember);

// Gestion des rôles des membres
router.post('/:id/roles', boardController.assignRoleToUser);
router.put('/:id/roles/:userId', boardController.updateUserRole);
router.delete('/:id/roles/:userId', boardController.removeUserRole);

// Gestion des labels
router.get('/:id/labels', labelController.getLabelsByBoard);    // récupère tous les labels
router.post('/:id/labels', labelController.createLabel);        // crée un nouveau label

// Gestion du partage de projets
router.post('/:id/share', boardController.shareBoard);         // partage le projet avec un utilisateur

module.exports = router;
