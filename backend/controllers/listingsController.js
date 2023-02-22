const Listing = require('../models/listingModel')
const mongoose = require('mongoose')


const getAllListings = async (req, res) => {
  const listings = await Listing.find({});
  res.status(200).json(listings);
}

const createListing = async (req, res) => {
  const {organisationName, title, description, address, neededByDate} = req.body;
  const requiredFields = {
    organisationName: "organisationName",
    title: "title",
    description: "description",
    address: "address",
    neededByDate: "neededByDate"
  };
  const emptyFields = Object.entries(requiredFields)
    .filter(([key, value]) => !req.body[key])
    .map(([key, value]) => value);
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({error: "Please fill in all fields", emptyFields})
  };
  try{
      const listing = await Listing.create({organisationName, title, description, address, neededByDate});
      res.status(200).json(listing);
    } catch (error){
        res.status(400).json({error: error.message});
    }
  }

  module.exports = {
    getAllListings , createListing
  };