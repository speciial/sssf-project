/**
 * NOTE:
 *  This is still work in progress. We are not sure how to
 *  implement the Global Market yet.
 *
 *  This should not be used anywhere in the codebase right now!
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const globalMarketOffer = new Schema({
  User: { type: Schema.Types.ObjectId, ref: 'User' },
  Message: String,
  GoldOffer: Number,
  Materials: [{ type: Schema.Types.ObjectId, ref: 'Material' }],
});

module.exports = mongoose.model('GlobalMarketOffer', globalMarketOffer);
