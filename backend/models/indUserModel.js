const mongoose = require('mongoose')

const validateEmail = (email) => {
  const emailToCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailToCheck.test(email);
};

const Schema = mongoose.Schema

const indUserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'required'],
  },

  surname: {
    type: String,
    required: [true, 'required'],
  },

  email: {
    type: String,
    required: [true, 'required'],
    validate: [validateEmail, "please use a valid email address"],
  },

  password: {
    type: String,
    required: [true, 'required'],
    minlength: [4, 'must be at least 4 characters long'],
    maxlength: 10 
  }
}, { timestamps: true })


const IndUser = mongoose.model('IndUser', indUserSchema);

module.exports = IndUser;
