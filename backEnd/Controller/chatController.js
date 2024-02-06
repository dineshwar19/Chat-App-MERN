const asyncHandler = require("express-async-handler");
const User = require("../Models/UserSchema");
const Chat = require("../Models/chatSchema");

const accessChat = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400);
    res.send("User Id is Undefined");
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email picture",
  });

  if (isChat > 0) {
    res.send(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    } catch (error) {
      console.log(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    let chat = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    res.status(200).send(chat);
  } catch (error) {
    res.status(400);
    throw new Error("can't get the data");
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  const { groupUsers, groupName } = req.body;

  if (!groupName || !groupUsers) {
    return res.status(400).send("invalid");
  }
  const users = JSON.parse(groupUsers);
  if (users.length < 2) {
    return res.status(400).send("Group must be more than 2 Members");
  }
  users.push(req.user);

  try {
    const group = await Chat.create({
      chatName: groupName,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user,
    });
    const fullChat = await Chat.findOne({ _id: group._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { groupId, groupName } = req.body;
  const updateName = await Chat.findByIdAndUpdate(groupId, {
    chatName: groupName,
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updateName) {
    res.status(200);
    throw new Error("Chat Not Found");
  } else {
    res.status(200).json(updateName);
  }
});
const addMember = asyncHandler(async (req, res) => {
  const { userId, groupId } = req.body;
  const memberAdd = await Chat.findByIdAndUpdate(groupId, {
    $push: { users: userId },
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!memberAdd) {
    res.status(400);
    throw new Error("User not found");
  }
  res.status(200).json(memberAdd);
});
const removeMember = asyncHandler(async (req, res) => {
  const { userId, groupId } = req.body;
  const memberRemoved = await Chat.findByIdAndUpdate(groupId, {
    $pull: { users: userId },
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!memberAdd) {
    res.status(400);
    throw new Error("User not found");
  }
  res.status(200).json(memberRemoved);
});
module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addMember,
  removeMember,
};
