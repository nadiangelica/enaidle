const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const validator = require("validator");

const { Schema } = mongoose;

const OrgCommentSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true },
    post_id: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrgComment", OrgCommentSchema);
