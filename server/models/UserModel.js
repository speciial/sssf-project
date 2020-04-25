const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: String,
  LastName: String,
  Username: String,
  Email: String,
  Password: { type: String, select: false },
  Materials: [{ type: Schema.Types.ObjectId, ref: "Material" }],
});

module.exports = mongoose.model("User", userSchema);
