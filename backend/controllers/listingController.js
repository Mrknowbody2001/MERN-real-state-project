const Listing = require("../model/listingModel");

module.exports.createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create({ ...req.body, userRef: req.user.id });
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
