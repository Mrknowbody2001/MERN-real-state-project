require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");




//  mongodb+srv://sandeepachamith53:G3GW9sSbXxewzKZt@mernrealestate.72fcg.mongodb.net/?retryWrites=true&w=majority&appName=mernRealEstate
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
  


const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000...!");
});
