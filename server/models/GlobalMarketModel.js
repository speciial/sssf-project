/**
 * NOTE:
 *  This is still work in progress. We are not sure how to 
 *  implement the Global Market yet.
 * 
 *  This should not be used anywhere in the codebase right now! 
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const globalMarketSchema = new Schema({
  Entries: [{ type: Schema.Types.ObjectId, ref: 'GlobalMarketEntry' }],
});

module.exports = mongoose.model('GlobalMarket', globalMarketSchema);
