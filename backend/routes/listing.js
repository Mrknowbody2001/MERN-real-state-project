const express = require("express");
const {
  createListing,
  deleteListing,
  updateListing,
  getListing,
} = require("../controllers/listingController");
const { verifyToken } = require("../utils/verifyUser");
const listingRouter = express.Router();

listingRouter.post("/create", verifyToken, createListing);
listingRouter.delete("/delete/:id", verifyToken, deleteListing);
listingRouter.put("/update/:id", verifyToken, updateListing);
listingRouter.get("/get/:id",getListing);

module.exports = listingRouter;
