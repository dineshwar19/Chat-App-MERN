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
  console.log(user);
  if (user && (await user.comparePassword(password))) {
    // we need to encrypt the password before save into the database so use bcryptjs package.(go to userSchema.js)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    });
  } else {
    res.status(401).json({ error: "Invalid Email or password" });
    throw new Error("Invalid Email or Password");
  }
});
module.exports = { regUser, logUser };
