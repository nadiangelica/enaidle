const express = require('express')
const IndUser = require('../models/indUserModel')

const router = express.Router()

// GET all individual users
router.get('/', (req, res) => {
    res.json({message: 'GET all individual users'})
})

//POST a new individual user
router.post('/', async (req, res) => {
    const {firstName, surname, email, password} = req.body

    try {
      const indUser = await IndUser.create({firstName, surname, email, password})
      res.status(200).json(indUser)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
})

module.exports = router;