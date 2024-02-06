const jwt = require("jsonwebtoken");
const User = require("../Models/UserSchema");
const asyncHandler = require("express-async-handler");

const secure = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (err) {
      throw new Error(err.message);
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized token");
  }
  if (!token) {
    res.status(401);
    throw new Error("Token Undefined");
  }
});

module.exports = secure;
