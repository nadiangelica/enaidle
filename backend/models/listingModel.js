const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { CommentSchema } = require("../models/commentModel");

const ListingSchema = new Schema(
  {
    organisationName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    requirement: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      firstLine: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postcode: {
        type: String,
        uppercase: true,
        required: true,
      },
    },
    neededByDate: {
      type: Date,
      required: true,
    },
    comments: [
      {
        type: CommentSchema,
      },
    ],
  },
  { timestamps: true }
);

ListingSchema.statics.save = async function (
  organisationName,
  title,
  requirement,
  description,
  address,
  neededByDate
) {
  if (!organisationName) {
    throw Error("Please provide an organisation name");
  } else if (!title) {
    throw Error("Please provide a title");
  } else if (!requirement) {
    throw Error("Please select from dropdown list");
  } else if (!description) {
    throw Error("Please provide a description");
  } else if (!address) {
    throw Error("Please provide an address");
  } else if (!neededByDate) {
    throw Error("Please provide a date");
  }
};

// module.exports = mongoose.model("Listing", listingSchema);
const Listing = mongoose.model("Listing", ListingSchema)

module.exports = Listing;
