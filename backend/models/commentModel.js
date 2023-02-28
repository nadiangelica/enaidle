const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const validator = require("validator");

const OrgUser = require("../models/orgUserModel");

const CommentSchema = new mongoose.Schema(
  {
    orgUser_id: { type: String, ref: "OrgUser" },
    indUser_id: { type: String, ref: "IndUser" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment, CommentSchema };
