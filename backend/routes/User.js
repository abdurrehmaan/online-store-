const express = require("express");
const asyncHandler = require("express-async-handler");
const VerifyToken = require("../middleware/Auth");

const userRouter = express.Router();

//controllers
const {
  userLogin,
  userRegister,
  UserProfile,
  LogoutUser,
  signup,
} = require("../controller/UserController");

//user routes
userRouter.post("/login", asyncHandler(userLogin));
userRouter.post("/register", asyncHandler(userRegister));
userRouter.get("/profile", VerifyToken, asyncHandler(UserProfile));
userRouter.post("/logout", asyncHandler(LogoutUser));
userRouter.post("/signup", asyncHandler(signup));

module.exports = userRouter;
