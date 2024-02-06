const express = require("express");
const router = express.Router();

const { regUser, logUser, allUser } = require("../Controller/userController");
const secure = require("../Middlewares/authMiddleware");

router.route("/").post(regUser).get(secure, allUser); //when user post by using this url http://localhost:8000/api/user . it handles by the function in Controller folder
router.route("/login").post(logUser);

module.exports = router;
