const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const Schema = mongoose.Schema;
const { CommentSchema } = require("../models/commentModel");

const ListingSchema = new Schema(
  {
    organisationName: {
      type: String,
      required: true,
    },
    organisation_id: {
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

// module.exports = mongoose.model("Listing", listingSchema);
const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
