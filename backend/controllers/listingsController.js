const Listing = require("../models/listingModel");
const mongoose = require("mongoose");
const OrgUser = require("../models/orgUserModel");
const { Comment } = require("../models/commentModel");

const getAllListings = async (req, res) => {
  const listings = await Listing.find({});
  res.status(200).json(listings);
};

const createListing = async (req, res) => {
  const {
    organisationName,
    organisation_id,
    title,
    requirement,
    description,
    address,
    neededByDate,
  } = req.body;

  try {
    const listing = await Listing.create({
      organisationName,
      organisation_id,
      title,
      requirement,
      description,
      address,
      neededByDate,
      comments: [],
    });
    res.status(200).json(listing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteListing = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No listing with id: ${id}`);
  }

  const listing = await Listing.findByIdAndRemove(id);

  if (!listing) {
    return res.status(404).send(`No listing with id: ${id}`);
  }
};

const findAListingById = async (req, res) => {
  try {
    const foundListing = await Listing.findById(req.params.id);
    if (foundListing) {
      res.status(200).json(foundListing);
    } else {
      res.status(404).json({ error: "Listing not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const addCommentToAListing = async (req, res) => {
  const listing = await Listing.findById({ _id: req.params.id });

  try {
    let comment;
    if (req.body.orgUserId) {
      comment = new Comment({
        orgUser_id: req.body.orgUserId,
        content: req.body.content,
      });
    } else {
      comment = new Comment({
        indUser_id: req.body.indUserId,
        content: req.body.content,
      });
    }

    listing.comments.push(comment);

    const updatedListing = await listing.save();

    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllListings,
  createListing,
  deleteListing,
  findAListingById,
  addCommentToAListing,
};
