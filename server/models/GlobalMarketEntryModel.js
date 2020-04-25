/**
 * NOTE:
 *  This is still work in progress. We are not sure how to 
 *  implement the Global Market yet.
 * 
 *  This should not be used anywhere in the codebase right now! 
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const globalMarketEntry = new Schema({
  User: { type: Schema.Types.ObjectId, ref: 'User' },
  SuggestedPrice: Number,
  Materials: [{ type: Schema.Types.ObjectId, ref: 'Material' }],
});

module.exports = mongoose.model('GlobalMarketEntry', globalMarketEntry);
