const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

//Ruta del chat (protegida)
router.get('/', isAuthenticated, chatController.chatPage);

module.exports = router;