const User = require("../model/User");
const bcrypt = require("bcryptjs");
module.exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password:hashedPassword });
  try{
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  }
  catch(err){
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
};
