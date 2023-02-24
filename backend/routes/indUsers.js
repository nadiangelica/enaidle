const express = require('express')
const {
    createIndUser,
    getIndUsers
} = require('../controllers/indUserController')

const router = express.Router()

// GET all individual users
router.get('/', getIndUsers)

//POST a new individual user
router.post('/', createIndUser)

module.exports = router;