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
//! get listing
module.exports.getListing = async (req, res, next) => {
  try {
    const listings = await Listing.findById(req.params.id);
    if (!listings) {
      return next(errorHandler(404, "Listing not found"));
    }
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

//! get listings

module.exports.getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [true, false] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [true, false] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [true, false] };
    }

    let type = req.query.type;
    if (type === undefined || type === "false") {
      type = { $in: ["rent", "sale"] };
    }

    const searchTerm = req.query.searchTerm || " ";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: {
        $regex: searchTerm,//search  any thing - word or letter doesnt care
        $options: "i", // doesn't cara about lower or uppercase
      },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
