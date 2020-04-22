const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: String,
  LastName: String,
  Username: String,
  Email: String,
  Password: String,
});

module.exports = mongoose.model("User", userSchema);
