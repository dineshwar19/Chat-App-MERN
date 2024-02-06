const asyncHandler = require("express-async-handler"); // handling exceptions inside of async express routes and passing them to your express error handlers
const User = require("../Models/UserSchema"); //it is the collection of the user data
const generateToken = require("../Config/generateToken");

const regUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body; //get the data from the request

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill the all fields");
  }

  const userExists = await User.findOne({ email }); //to get the boolean value from the database .
  if (userExists) {
    // if the mail id is already in the database collection
    res.status(400);
    throw new Error("Email already Exists");
  }

  const user = await User.create({
    // the user is new to the database , then create an object using the request body
    name: name,
    email: email,
    password: password,
    picture: picture,
  });

  if (user) {
    //after successfully created an object in the User collection . just return the object id , name ,email and pic(not important)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create");
  }
});

const logUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("please fill all the fields");
  }
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    // we need to encrypt the password before save into the database so use bcryptjs package.(go to userSchema.js)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ error: "Invalid Email or password" });
  }
});

const allUser = asyncHandler(async (req, res) => {
  // req.query this return an object {search : userName , one : user2} when the url look like this http://localhost:8000/api/user?search=userName&&one=user2

  const search = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  //before use the id : $ne , first create the authorization middleware
  const user = await User.find(search).find({ _id: { $ne: req.user._id } });
  res.send(user);
});
module.exports = { regUser, logUser, allUser };
