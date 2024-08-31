const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateToken } = require("./utilControllers/generateToken");

// @desc -      registers a user
// @route -     /api/users
// @access -    public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  //Validation
  if (!firstName || !email || !password) {
    res.status(400);
    throw new Error("PLease include necessary fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(401);
    throw new Error("User/email already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to input sales transaction.");
  }
});

// @desc -      login a user
// @route -     /api/users/login
// @access -    public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && bcrypt.compare(password, user.password)) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentails");
  }
});

// @desc Get current user
// @route /api/user/me
// @access private

const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  };

  res.status(200).send(user);
  // res.send("me");
});

// @desc Get list of users
// @route /api/user/allUsers
// @access private

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      console.log('user backend')
      res.status(200).json(users);
    }

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
};
