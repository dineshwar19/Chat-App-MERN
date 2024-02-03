const mongoose = require("mongoose"); //mongoose is the main package to create a schema for the data.

//it just an object , it is used for the schema of the data.
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

//mongoose.schema is a function which accepts objects as parameters 1.object of the schema structure , 2.options for the schema.
const chatModel = mongoose.Schema(chatSchema, { timestamps: true });

//mongoose.model is a function which takes two arguments 1.collection name , 2.schema for the collection
module.exports = mongoose.model("Chat", chatModel);
