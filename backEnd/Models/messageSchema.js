const mongoose = require("mongoose");

const messageSchema = {
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    trim: true,
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
};

const messageModel = mongoose.Schema(messageSchema, { timestamps: true });

module.exports = mongoose.model("Message", messageModel);
