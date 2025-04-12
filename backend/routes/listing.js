const express = require("express");
const { createListing } = require("../controllers/listingController");
const { verifyToken } = require("../utils/verifyUser");
const listingRouter = express.Router();

listingRouter.post("/create",verifyToken, createListing);

module.exports = listingRouter;