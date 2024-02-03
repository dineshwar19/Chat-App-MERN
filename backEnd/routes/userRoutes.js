const express = require("express");
const router = express.Router();

const { regUser , logUser } = require("../Controller/userController");

router.route("/").post(regUser); //when user post by using this url http://localhost:8000/api/user . it handles by the function in Controller folder
router.route("/login").post(logUser);

module.exports = router;
