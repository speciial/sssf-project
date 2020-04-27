'use strict';

const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');

const {
  marketType,
  marketEntryType,
  addMarketEntryType,
} = require('./MarketType');

const MarketModel = require('../models/MarketModel');
const MarketEntryModel = require('../models/MarketEntryModel');

const MaterialRatioModel = require('../models/MaterialRatioModel');

/**
 * NOTE:
 *  For now, it is only possible to add an empty market!
 */
const addMarket = {
  type: marketType,
  args: {
    Name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      return await MarketModel.create(args);
    } catch (error) {
      return new Error(error);
    }
  },
};

// TODO: implement
const deleteMarket = {};

// TODO: implement
const modifyMarket = {};

const addMarketEntry = {
  type: marketEntryType,
  args: {
    MarketName: { type: new GraphQLNonNull(GraphQLString) },
    MarketEntry: { type: new GraphQLNonNull(addMarketEntryType) },
  },
  resolve: async (parent, args) => {
    try {
      // getting the market for the entry
      const market = await MarketModel.findOne({ Name: args.MarketName });

      // saving the offered materials
      const newMaterials = await Promise.all(
        args.MarketEntry.Materials.map(async (matRatio) => {
          const newMatRatio = new MaterialRatioModel(matRatio);
          await newMatRatio.save();
          return newMatRatio._id;
        })
      );
      args.MarketEntry.Materials = newMaterials;

      // creating the entry
      const newEntry = new MarketEntryModel(args.MarketEntry);
      await newEntry.save();

      // adding the entrie to market
      if (!market.Entries) {
        market.Entries = [];
      }
      market.Entries.push(newEntry._id);
      await MarketModel.findByIdAndUpdate(market._id, market, { new: true });

      return newEntry;
    } catch (error) {
      return new Error(error);
    }
  },
};

// TODO: implement
const deleteMarketEntry = {};

// TODO: implement
const modifyMarketEntry = {};

const addMarketOffer = {};

// TODO: implement
const deleteMarketOffer = {};

// TODO: implement
const modifyMarketOffer = {};

module.exports = {
  addMarket,
  addMarketEntry,
};
