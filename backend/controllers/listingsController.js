const Listing = require("../models/listingModel");
const mongoose = require("mongoose");

const getAllListings = async (req, res) => {
  const listings = await Listing.find({});
  res.status(200).json(listings);
};

const createListing = async (req, res) => {
  const {
    organisationName,
    title,
    requirement,
    description,
    address,
    neededByDate,
  } = req.body;
  const requiredFields = {
    organisationName: "organisationName",
    title: "title",
    requirement: "requirement",
    description: "description",
    address: "address",
    neededByDate: "neededByDate",
  };
  try {
    const listing = await Listing.create({
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

const deleteListing = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No listing with id: ${id}`);
  }

  const listing = await Listing.findByIdAndRemove(id);

  if(!listing) {
    return res.status(404).send(`No listing with id: ${id}`);
  }

  res.json({ message: "Listing deleted successfully." });
};

module.exports = {
  getAllListings,
  createListing,
  deleteListing,
};
