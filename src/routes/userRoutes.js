const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

router.get('/me', auth, userController.getMe);
router.put('/me', auth, userController.updateMe);

module.exports = router;
