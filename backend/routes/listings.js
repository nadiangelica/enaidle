const express = require("express");
const router = express.Router();
const {getAllListings, createListing, deleteListing, addCommentToAListing} = require('../controllers/listingsController')

router.get('/' , getAllListings);
router.post('/' , createListing);
router.delete('/:id' , deleteListing);
router.post('/:listing_id/add-comment' , addCommentToAListing);


module.exports = router;