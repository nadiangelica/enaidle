const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  organisationName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  requirement: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    firstLine: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postcode: {
      type: String,
      uppercase: true,
      required: true
    },
  },
    neededByDate: {
      type: Date,
      required: true
    }
  }, { timestamps: true })

module.exports = mongoose.model('Listing', listingSchema)