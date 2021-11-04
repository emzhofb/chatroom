const User = require('../models/user');

exports.joinChatroom = async (req, res, next) => {
  const { username, roomId } = req.body;
  if (!username || !roomId) {
    res.status(400).json({
      success: false,
      message: 'Required'
    });
  }
  
  let findUser;
  try {
    findUser = await User.find({ 
      username: username
    });
  } catch (error) {
    findUser = [];
  }

  if (findUser && findUser.length < 1) {
    const user = new User({ username, roomId });
    try {
      await user.save();
      res.status(200).json({
        success: true,
        message: 'Success join chatroom',
        cata: {
          username,
          roomId
        }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'System error'
      });
    }
  } else {
    let findRoom;
    try {
      findRoom = await User.find({ 
        username: username,
        roomId: {
          $in: roomId
        }
      });
    } catch (error) {
      findRoom = [];
    }

    if (findRoom && findRoom.length < 1) {
      try {
        await User.findOneAndUpdate(
          { username }, 
          { $push: { roomId: roomId } }
        );
        res.status(200).json({
          success: true,
          message: 'Success join chatroom'
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: 'System error'
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Username or room has been taken'
      });
    }
  }
};
