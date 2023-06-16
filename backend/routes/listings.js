const express = require("express");
const router = express.Router();
const {
  getAllListings,
  createListing,
  deleteListing,
  findAListingById,
  addCommentToAListing,
} = require("../controllers/listingsController");
const requireAuth = require('../middleware/requireAuth');

router.get("/:id", findAListingById);
router.get("/", getAllListings);
router.post("/", requireAuth, createListing);
router.delete("/:id", requireAuth, deleteListing);
router.post("/:id/add-comment", requireAuth, addCommentToAListing);

module.exports = router;
