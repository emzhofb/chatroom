const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
  {
    roomId: {
      type: String
    },
    chat: {
      type: String
    },
    username: {
      type: String
    }
  },
  {
    // Enable timestamps
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  }
);

module.exports = mongoose.model("Chat", ChatSchema);
