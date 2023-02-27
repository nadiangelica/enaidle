const IndUser = require("../models/indUserModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30m" });
};

const loginIndUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const indUser = await IndUser.login(email, password);
    const token = createToken(indUser._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createIndUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const indUser = await IndUser.register(
      firstName,
      lastName,
      email,
      password
    );

    const token = createToken(indUser._id);

    res.status(201).json({
      _id: indUser._id,
      firstName: indUser.firstName,
      lastName: indUser.lastName,
      email: indUser.email,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const findIndUserById = async (req, res) => {
  try {
    let indUser = req.params.indUser_id;
    res.status(200).json({ indUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginIndUser,
  createIndUser,
  findIndUserById,
};