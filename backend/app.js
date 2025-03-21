const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const dotenv = require("dotenv");
//
require("dotenv").config();
//
const app = express();
//middleware
app.use(express.json());

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



//!start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000...!");
});
