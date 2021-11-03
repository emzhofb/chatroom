const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user');

router.post('/join-chatroom', userControllers.joinChatroom);

module.exports = router;
