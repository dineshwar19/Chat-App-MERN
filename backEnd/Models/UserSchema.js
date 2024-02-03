const mongoose = require("mongoose");

const userSchema = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
};
const userModel = mongoose.Schema(userSchema, { timestamps: true });
module.exports = mongoose.model("User", userModel);
