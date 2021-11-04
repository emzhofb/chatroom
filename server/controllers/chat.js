const Chat = require('../models/chat');

exports.addChat = async (req, res, next) => {
  const { chat } = req.body;
  const { roomId, username } = req.query;

  if (!chat) {
    res.status(400).json({
      success: false,
      message: 'Chat required'
    });
  }

  try {
    const newChat = new Chat({ roomId, username, chat });
    await newChat.save();
    res.status(200).json({
      success: true,
      message: 'chat added!',
      data: {
        chat,
        roomId,
        username
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'System error'
    });
  }
}

exports.getChat = async (req, res, next) => {
  const { roomId } = req.query;

  if (!roomId) {
    res.status(400).json({
      success: false,
      message: 'roomId required'
    });
  }

  try {
    const chats = await Chat.find({ roomId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'success get chats',
      data: chats
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'System error'
    });
  }
}
