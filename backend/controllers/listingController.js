const Listing = require("../model/listingModel");
const errorHandler = require("../utils/errorHandler");

module.exports.createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create({ ...req.body, userRef: req.user.id });
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

//! delete listing
module.exports.deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    if (listing.userRef.toString() !== req.user.id) {
      return next(errorHandler(403, "You can delete only your listing"));
    }
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted");
  } catch (error) {
    next(error);
  }
};

//! update listing

module.exports.updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    if (listing.userRef.toString() !== req.user.id) {
      return next(errorHandler(403, "You can update only your listing"));
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

module.exports.getListing = async (req, res, next) => {
  try {
    const listings = await Listing.findById(req.params.id);
    if (!listings ){
      return next(errorHandler(404, "Listing not found"));
    }
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};