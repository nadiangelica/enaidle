const IndUser = require('../models/indUserModel');
const mongoose = require('mongoose');

//get all individual users
const getAllIndUsers = async (req, res) => {
    const indUsers = await IndUser.find({}).sort({createdAt: -1})
    res.status(200).json(indUsers)
}

//create a new individual user
const createIndUser = async (req,  res) => {
    const {firstName, surname, email, password} = req.body

    try {
      const indUser = await IndUser.create({firstName, surname, email, password})
      res.status(201).json({message: "Thanks! your account has been successfully created"})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

module.exports = {
    createIndUser,
    getAllIndUsers
}