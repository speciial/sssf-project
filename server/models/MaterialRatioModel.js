const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const materialRatioSchema = new Schema({
  MaterialID: { type: Schema.Types.ObjectId, ref: 'Material' },
  Quantity: Number,
});

module.exports = mongoose.model('MaterialRatio', materialRatioSchema);
