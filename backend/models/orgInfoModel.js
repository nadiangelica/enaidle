const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const OrgInfoSchema = new mongoose.Schema({
  missionStatement: String,
  websiteUrl: String,
  logoUrl: String,
  address: String,
});

const OrgInfo = mongoose.model("OrgInfo", OrgInfoSchema);

module.exports = { OrgInfo, OrgInfoSchema };
