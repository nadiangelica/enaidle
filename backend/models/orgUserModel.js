const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const bcrypt = require("bcrypt");
const validator = require("validator");

const OrgUserSchema = new mongoose.Schema({
  organisationName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  charityNumber: Number,
  password: {
    type: String,
    required: true,
  },
});

OrgUserSchema.statics.register = async function (
  organisationName,
  email,
  charityNumber,
  password
) {
  if (!organisationName && !email && !password) {
    throw new Error("Please complete all required fields");
  } else if (!email) {
    throw new Error("Please provide an email address");
  } else if (!organisationName) {
    throw new Error("Please provide an organisation name");
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

  const orgUser = await this.create({
    organisationName,
    email,
    charityNumber,
    password: hash,
  });
  return orgUser;
};

OrgUserSchema.statics.login = async function (email, password) {
  if (!email && !password) {
    throw new Error("Please complete all required fields");
  } else if (!email) {
    throw new Error("Please provide an email address");
  } else if (!password) {
    throw new Error("Please provide a password");
  } 
  const orgUser = await this.findOne({ email });

  if (!orgUser) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, orgUser.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return orgUser;
};
const OrgUser = mongoose.model("OrgUser", OrgUserSchema);

module.exports = OrgUser;
