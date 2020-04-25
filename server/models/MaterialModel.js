const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const materialSchema = new Schema({
  Name: String,
  Size: Number,
  Weight: Number,
  Picture: String,
  CraftingRecipe: [{ type: Schema.Types.ObjectId, ref: 'MaterialRatio' }],
});

module.exports = mongoose.model('Material', materialSchema);
