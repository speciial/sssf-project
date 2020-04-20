const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const materialSchema = new Schema({
  Name: String,
  Size: Number,
  Weight: Number,
  Picture: String,
});

module.exports = mongoose.model('Material', materialSchema);
