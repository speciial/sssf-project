const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const marketEntry = new Schema({
  User: { type: Schema.Types.ObjectId, ref: 'User' },
  SuggestedPrice: Number,
  Materials: [{ type: Schema.Types.ObjectId, ref: 'Material' }],
  Offers: [{ type: Schema.Types.ObjectId, ref: 'MarketOffer' }],
});

module.exports = mongoose.model('MarketEntry', marketEntry);
