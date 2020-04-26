const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: String,
  LastName: String,
  Username: String,
  Email: String,
  Password: { type: String },
  Materials: [
    { type: Schema.Types.ObjectId, ref: "UserMaterial", default: [] },
  ],
  Buildings: [{ type: Schema.Types.ObjectId, ref: "Building", default: [] }],
});

module.exports = mongoose.model("User", userSchema);
