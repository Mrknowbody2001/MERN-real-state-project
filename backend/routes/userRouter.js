const express = require("express");
const userRouter = express.Router();
const {
  updateUser,
  deleteUser,
  getUserListings,
  getUser,
} = require("../controllers/userController");
const { verifyToken } = require("../utils/verifyUser");
const { get } = require("mongoose");

userRouter.put("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
userRouter.get("/listings/:id", verifyToken, getUserListings);
userRouter.get ("/:id",verifyToken,getUser)

module.exports = userRouter;
