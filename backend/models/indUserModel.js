const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const bcrypt = require('bcrypt');
const validator = require('validator');

const IndUserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});

IndUserSchema.statics.register = async function (
  firstName,
  lastName,
  email,
  password
) {
  if (!firstName && !lastName && !email && !password) {
    throw new Error("Please complete all required fields");
  } else if (!email) {
    throw new Error("Please provide an email address");
  } else if (!firstName) {
    throw new Error("Please provide a first name");
  } else if (!lastName) {
    throw new Error("Please provide a last name");
  } else if (!password) {
    throw new Error("Please provide a password");
  } else if (!validator.isEmail(email)) {
    throw new Error("Please provide a valid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be 8 characters or longer \nPassword must have at least one digit (0-9) \nPassword must have at least one uppercase ('A'-'Z') \nPassword must have at least one special character ('!\"#$%&'()*+,‑./&')"
    );
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const indUser = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
  });
  return indUser;
};

IndUserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Please provide an email and password");
  } else if (!email) {
    throw new Error("Please provide an email address");
  } else if (!password) {
    throw new Error("Please provide a password");
  } 
  const indUser = await this.findOne({ email });

  if (!indUser) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, indUser.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return indUser;
};
const IndUser = mongoose.model("IndUser", IndUserSchema);

module.exports = IndUser;
