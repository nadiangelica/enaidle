const express = require("express");
const router = express.Router();
const {getAllListings, createListing} = require('../controllers/listingsController')

router.get('/' , getAllListings);
router.post('/' , createListing);


module.exports = router;



