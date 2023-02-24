const express = require('express')
const {
    createIndUser,
    getAllIndUsers
} = require('../controllers/indUserController')

const router = express.Router()

// GET all individual users
router.get('/', getAllIndUsers)

//POST a new individual user
router.post('/', createIndUser)

module.exports = router;