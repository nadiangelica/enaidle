const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const bcrypt = require('bcrypt');
const validator = require('validator');
const {OrgInfoSchema} = require('./orgInfoModel');

const OrgUserSchema = new mongoose.Schema({
  organisationName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  charityNumber: Number,
  password: {
    type: String,
    required: true
  },
  info: [{type: OrgInfoSchema}]
})

OrgUserSchema.statics.register = async function (organisationName, email, charityNumber, password) {

    if(!organisationName || !email || !password) {
      throw Error("Please provide an organisation name, email and password");
    } else if (!validator.isEmail(email)) {
      throw Error("Please provide a valid email address");
    } else if (!validator.isStrongPassword(password)) {
      throw Error("Please provide a strong password");
    }

    const exists = await this.findOne({ email });

    if(exists) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const orgUser = await this.create({ organisationName, email, charityNumber, password: hash });
    
    return orgUser;
}

OrgUserSchema.statics.login = async function (email, password) {

  if(!email || !password) {
    throw new Error("Please provide an email and password");
  }
  const orgUser = await this.findOne({ email });

  if(!orgUser) {
    throw Error('incorrect email');
  }

  const match = await bcrypt.compare(password, orgUser.password);

  if(!match) {
    throw Error('incorrect password');
  }

  return orgUser;

}
const OrgUser = mongoose.model("OrgUser", OrgUserSchema);

module.exports = OrgUser;