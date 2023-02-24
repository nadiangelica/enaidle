const express = require('express')

const router = express.Router()

// GET all individual users
router.get('/', (req, res) => {
    res.json({message: 'GET all individual users'})
})

//POST a new individual user
router.post('/', (req, res) => {
    res.json({message: 'POST a new individual user'})
})

module.exports = router;