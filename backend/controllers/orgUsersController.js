const OrgUser = require("../models/orgUserModel");
const mongoose = require('mongoose');

const getAllOrgUsers = async (req, res) => {
  const orgUsers = await OrgUser.find({});
  res.status(200).json(orgUsers);
}

const createOrgUser = async (req, res) => {
  try {
    await OrgUser.create(req.body);
    res.status(201).json({message: "Thanks! your account has been successfully created"});
  } catch (error){
    res.status(400).json({error: error.message});
  }
}

module.exports = {
  getAllOrgUsers, createOrgUser
};