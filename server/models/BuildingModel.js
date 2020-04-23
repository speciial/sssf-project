const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buildingSchema = new Schema({
  Name: String,
  Cost: Number,
  MaterialID: { type: Schema.Types.ObjectId, ref: 'Material' },
  Picture: String,
});

module.exports = mongoose.model('Building', buildingSchema);
