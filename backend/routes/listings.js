const express = require("express");
const router = express.Router();
const {getAllListings, createListing, deleteListing, updateListing} = require('../controllers/listingsController')

router.get('/' , getAllListings);
router.post('/' , createListing);
router.delete('/:id' , deleteListing);


module.exports = router;