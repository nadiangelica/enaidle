const OrgUser = require("../models/orgUser");
// const mongoose = require('mongoose');

const getAllOrgUsers = async (req, res) => {
  const orgUsers = await OrgUser.find({});
  res.status(200).json(orgUsers);
}

const createOrgUser = async (req, res) => {
  try {
    const orgUser = await OrgUser.create(req.body);
    res.status(200).json(orgUser);
  } catch (error){
    res.status(400).json({error: error.message});
  }
}

module.exports = {
  getAllOrgUsers, createOrgUser
};