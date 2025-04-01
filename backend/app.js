const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
//
require("dotenv").config();
//
const app = express();
//middleware
app.use(express.json());
///
app.use(cookieParser());

// connect to the database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//route
// app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

//
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
});

//!start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000...!");
});
