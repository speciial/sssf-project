const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const marketOffer = new Schema({
  User: { type: Schema.Types.ObjectId, ref: 'User' },
  Message: String,
  GoldOffer: Number,
  Materials: [{ type: Schema.Types.ObjectId, ref: 'Material' }],
});

module.exports = mongoose.model('MarketOffer', marketOffer);
