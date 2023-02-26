const Listing = require("../models/listingModel");
const OrgUser = require("../models/orgUserModel");
const mongoose = require("mongoose");
const OrgCommentSchema = require("../models/commentModel");

const getAllListings = async (req, res) => {
  const listings = await Listing.find({});
  res.status(200).json(listings);
};

const createListing = async (req, res) => {
  const {organisationName, title, requirement, description, address, neededByDate} = req.body;

  // const requiredFields = {
  //   organisationName: "organisationName",
  //   title: "title",
  //   requirement: "requirement",
  //   description: "description",
  //   address: "address",
  //   neededByDate: "neededByDate",
  // };

  try {
    const newAd = await Listing.create({
      organisationName,
      title,
      requirement,
      description,
      address,
      neededByDate,
    });
    res.status(200).json(listing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// need to finish code
const getAllComments = async (req, res) => {
  const listings = await Listing.find({});
  res.status(200).json(listings);
};

const addCommentToAd = async (req, res) => {
  const listingId = req.params.id; // ID of the listing to add the comment to
  const comment = req.body.comment; // New comment to add

  try {
    // Find the listing by ID
    const listing = await Listing.findById(listingId);

    if (!listing) {
      // If the listing doesn't exist, return a 404 error
      return res.status(404).json({ error: "Listing not found" });
    }

    // Create a new comment object
    const comment = new OrgCommentSchema({
      user_id: req.user._id, // assuming the user ID is available in the request
      post_id: listing._id,
      content: content,
    });

    // Add the new comment to the Comments array
    listing.Comments.push(comment);

    // Save the updated listing
    const updatedListing = await listing.save();

    // Return the updated listing as a response
    res.status(200).json(updatedListing);
  } catch (error) {
    // If an error occurs, return a 500 error with the error message
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllListings,
  createListing,
  getAllComments,
  addCommentToAd
};
