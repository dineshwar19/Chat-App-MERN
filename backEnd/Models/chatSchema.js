const mongoose = require("mongoose");

const chatSchema = {
  chatName: {
    type: String,
    trim: true,
  },
  isGroupChat: {
    type: Boolean,
    default: false,
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
};

const chatModel = mongoose.Schema(chatSchema, { timestamps: true });
module.exports = mongoose.model("Chat", chatModel);