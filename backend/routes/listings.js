const express = require("express");
const router = express.Router();
const {getAllListings, createListing, deleteListing} = require('../controllers/listingsController')

router.get('/listings' , getAllListings);
router.post('/' , createListing);
router.delete('/listings/:id' , deleteListing);


module.exports = router;