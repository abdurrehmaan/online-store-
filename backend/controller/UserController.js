//models
const User = require("../models/User");

//token
const generateToken = require("../tokenGenerate");

//user login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.cookie("loginToken", generateToken(user._id), {
      HttpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

//Register user
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(401);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid user data");
    }
  }
};

//profile
const UserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

//signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(200).json({ message: "User created successfully" });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

const LogoutUser = async (req, res) => {
  try {
    console.log("logout api");
    res.cookie("loginToken", "", { maxAge: 0 });
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
};

module.exports = {
  userLogin,
  userRegister,
  UserProfile,
  LogoutUser,
  signup,
};
