const express = require("express");
const userRouter = express.Router();
const { updateUser } = require("../controllers/userController");
const { verifyToken } = require("../utils/verifyUser");

userRouter.put("/update/:id", verifyToken, updateUser);

module.exports = userRouter;
