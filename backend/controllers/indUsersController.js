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
    const id = indUser._id
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createIndUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const indUser = await IndUser.register(firstName, lastName, email, password);

    const token = createToken(indUser._id);

    res.status(201).json({ indUser, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const findIndUserById = async (req, res) => {
  const indUserId = req.params.ind_user_id;
  try {
    const indUser = await IndUser.findById({ _id:indUserId }, '-password');
    res.status(200).json(indUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginIndUser,
  createIndUser,
  findIndUserById,
};
