const User = require('../models/user');

exports.checkRoom = async (req, res, next) => {
  const { username, roomId } = req.query;
  
  try {
    let findUser = await User.find({
      username: username,
      roomId: {
        $in: roomId
      }
    });

    if (findUser && findUser.length > 0) {
      next();
    } else {
      res.status(401).json({
        success: false,
        message: 'No Room or Username'
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'System error'
    });
  }
};
