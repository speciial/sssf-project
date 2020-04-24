const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userMaterialSchema = new Schema({
  Material: { type: Schema.Types.ObjectId, ref: "Material" },
  Quantity: Number,
});

module.exports = mongoose.model("UserMaterial", userMaterialSchema);
