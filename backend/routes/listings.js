const express = require("express");
const router = express.Router();
const {getAllListings, createListing, getAllComments, addCommentToAd} = require('../controllers/listingsController');

router.get('/' , getAllListings);
router.post('/' , createListing);
router.get('/:listing_id/all-comments' , getAllComments);
router.post('/:listing_id/add-comment' , addCommentToAd);

module.exports = router;