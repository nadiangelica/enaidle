const OrgUser = require("../models/orgUserModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30m" });
}

const loginOrgUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const orgUser = await OrgUser.login(email, password);
    const token = createToken(orgUser._id);
    res.status(200).json({ email, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const createOrgUser = async (req, res) => {
  const { organisationName, email, charityNumber, password } = req.body;

  try {
    const orgUser = await OrgUser.register(organisationName, email, charityNumber, password);

    const token = createToken(orgUser._id);

    res.status(200).json({ orgUser, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  loginOrgUser, createOrgUser
};
