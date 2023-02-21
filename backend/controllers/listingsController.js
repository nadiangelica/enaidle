const Listing = require('../models/listingModel')
const mongoose = require('mongoose')


const getAllListings = async (req, res) => {
  const listings = await Listing.find({}).sort({createdAt: -1});
  res.status(200).json(listings);
}

const createListing = async (req, res) => {
  const {organisationName, title, description, location} = req.body;
  let emptyFields = [];
  if (!organisationName){
    emptyFields.push('organisationName');
  } else if (!title){
    emptyFields.push('title');
  }else if (!description){
    emptyFields.push('description');
  }else if (!location){
    emptyFields.push('location');
  // }else if(!neededByDate){
  //   emptyFields.push('neededByDate');
   }
  if (emptyFields.length>0){
    return res.status(400).json({error: 'Please fill in all fields', emptyFields});
  }
  try{
      const listing = await Listing.create({organisationName, title, description, location});
      res.status(200).json(listing);
    } catch (error){
        res.status(400).json({error: error.message});
    }
  }

  module.exports = {
    getAllListings , createListing
  };
