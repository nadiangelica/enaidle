const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const validateEmail = (email) => {
  const emailToCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailToCheck.test(email);
};

const OrgUserSchema = new mongoose.Schema({
  organisationName: String,
  email: {
    type: String,
    required: [true, 'required'],
    // unique: [true, 'This email is already in use'],
    validate: [validateEmail, "please use a valid email address"],
  },
  charityNumber: String,
  password: {
    type: String,
    required: [true, 'required'],
    minlength: [4, 'must be at least 4 characters long'],
    maxlength: 10 
  },
});

const OrgUser = mongoose.model("OrgUser", OrgUserSchema);

module.exports = OrgUser;

//keep