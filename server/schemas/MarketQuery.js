'use strict';

const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const { marketType } = require('./MarketType');

const MarketModel = require('../models/MarketModel');

const markets = {
  type: new GraphQLList(marketType),
  resolve: async (parent, args) => {
    try {
      return await MarketModel.find({});
    } catch (error) {
      return new Error(error);
    }
  },
};

const marketById = {
  type: marketType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args) => {
    try {
      return await MarketModel.findById(args.id);
    } catch (error) {
      return new Error(error);
    }
  },
};

const marketByName = {
  type: marketType,
  args: {
    Name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      return await MarketModel.findOne({ Name: args.Name });
    } catch (error) {
      return new Error(error);
    }
  },
};

module.exports = {
  markets,
  marketById,
  marketByName,
};
