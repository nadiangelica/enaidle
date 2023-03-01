const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const IndInfoSchema = new mongoose.Schema({
    aboutMe: String,
    helpingWith: String,
    pictureUrl: String,
    joinDate: String
},
  { timestamps: true });

const IndInfo = mongoose.model("IndInfo", IndInfoSchema);

module.exports = {IndInfo, IndInfoSchema};