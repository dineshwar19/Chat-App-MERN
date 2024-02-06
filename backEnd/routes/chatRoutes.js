const express = require("express");
const secure = require("../Middlewares/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeMember,
  addMember,
} = require("../Controller/chatController");
const router = express.Router();

router.route("/").post(secure, accessChat);
router.route("/").get(secure, fetchChats);
router.route("/group").post(secure, createGroupChat);
router.route("/rename").put(secure, renameGroup);
router.route("/removeMember").put(secure, removeMember);
router.route("/addMember").put(secure, addMember);

module.exports = router;
