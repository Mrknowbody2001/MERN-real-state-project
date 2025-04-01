const errorHandler = require("./errorHandler");
const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "unauthorized"));
  //
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(401, "unauthorized"));
    req.user = user;
    next();
  });
};
