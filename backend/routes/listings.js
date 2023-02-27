const express = require("express");
const router = express.Router();
const {getAllListings, createListing, addCommentToAListing} = require('../controllers/listingsController');

router.get('/' , getAllListings);
router.post('/' , createListing);
router.post('/:listing_id/add-comment' , addCommentToAListing);

module.exports = router;