const express = require("express");
const userRouter = express.Router();
const { updateUser, deleteUser, getUserListings } = require("../controllers/userController");
const { verifyToken } = require("../utils/verifyUser");
const { get } = require("mongoose");

userRouter.put("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
userRouter.get("/listings/:id", verifyToken, getUserListings);

module.exports = userRouter;
