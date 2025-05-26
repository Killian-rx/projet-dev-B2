// 📁 routes/boardRoutes.js
const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

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

module.exports = router;
