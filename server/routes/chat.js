const express = require('express');
const router = express.Router();
const chatControllers = require('../controllers/chat');
const authMiddlewares = require('../middlewares/auth');

router.post('/add', authMiddlewares.checkRoom, chatControllers.addChat);
router.get('/', authMiddlewares.checkRoom, chatControllers.getChat);

module.exports = router;
