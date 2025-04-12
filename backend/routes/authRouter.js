const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.post("/signup", authController.signup);
authRouter.post("/signin", authController.signin);
authRouter.post("/google", authController.google);
authRouter.get("/signout", authController.signout);

module.exports = authRouter;
