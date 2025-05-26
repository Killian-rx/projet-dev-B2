// 📁 routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Obtenir tous les rôles
router.get('/', roleController.getAllRoles);

// Créer un nouveau rôle
router.post('/', roleController.createRole);

module.exports = router;
