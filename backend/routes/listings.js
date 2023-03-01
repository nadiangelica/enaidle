const express = require("express");
const router = express.Router();
const {
  getAllListings,
  createListing,
  deleteListing,
  findAListingById,
  addCommentToAListing,
} = require("../controllers/listingsController");

router.get("/:id", findAListingById);
router.get("/", getAllListings);
router.post("/", createListing);
router.delete("/:id", deleteListing);
router.post("/:id/add-comment", addCommentToAListing);

module.exports = router;
