const express = require("express");
const userRouter = express.Router();
const { updateUser, deleteUser } = require("../controllers/userController");
const { verifyToken } = require("../utils/verifyUser");

userRouter.put("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);

module.exports = userRouter;
