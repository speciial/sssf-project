const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const marketSchema = new Schema({
  Name: String,
  Entries: [{ type: Schema.Types.ObjectId, ref: 'MarketEntry' }],
});

module.exports = mongoose.model('Market', marketSchema);
