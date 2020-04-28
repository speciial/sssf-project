const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  Username: String,
  Message: String,
  Time: Date,
});

module.exports = mongoose.model("Chat", chatSchema);
