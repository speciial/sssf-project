'use strict';

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const { materialRatioType } = require('./MaterialType');
const { userType } = require('./UserType');

const UserModel = require('../models/UserModel');
const MaterialRatioModel = require('../models/MaterialRatioModel');

const GlobalMarketEntryModel = require('../models/GlobalMarketEntryModel');
const GlobalMarketOfferModel = require('../models/GlobalMarketOfferModel');

const globalMarketType = new GraphQLObjectType({
  name: 'globalMarket',
  fields: () => ({
    id: { type: GraphQLID },
    Entries: {
      type: new GraphQLList(globalMarketEntryType),
      resolve: async (parent, args) => {
        try {
          return await GlobalMarketEntryModel.find({ _id: parent.Entries });
        } catch (error) {
          return new Error(error);
        }
      },
    },
  }),
});

const globalMarketEntryType = new GraphQLObjectType({
  name: 'globalMarketEntry',
  fields: () => ({
    id: { type: GraphQLID },
    User: {
      type: userType,
      resolve: async (parent, args) => {
        try {
          return await UserModel.findById(parent.User);
        } catch (error) {
          return new Error(error);
        }
      },
    },
    SuggestedPrice: { type: GraphQLInt },
    Materials: {
      type: new GraphQLList(materialRatioType),
      resolve: async (parent, args) => {
        try {
          return await MaterialRatioModel.find({ _id: parent.CraftingRecipe });
        } catch (error) {
          return new Error(error);
        }
      },
    },
    Offers: {
      type: new GraphQLList(globalMarketOfferType),
      resolve: async (parent, args) => {
        try {
          return await GlobalMarketOfferModel.find({ _id: parent.Offers });
        } catch (error) {
          return new Error(error);
        }
      },
    },
  }),
});

const globalMarketOfferType = new GraphQLObjectType({
  name: 'globalMarketOffer',
  fields: () => ({
    id: { type: GraphQLID },
    User: {
      type: userType,
      resolve: async (parent, args) => {
        try {
          return await UserModel.findById(parent.User);
        } catch (error) {
          return new Error(error);
        }
      },
    },
    Message: { type: GraphQLString },
    GoldOffer: { type: GraphQLInt },
    Materials: {
      type: new GraphQLList(materialRatioType),
      resolve: async (parent, args) => {
        try {
          return await MaterialRatioModel.find({ _id: parent.CraftingRecipe });
        } catch (error) {
          return new Error(error);
        }
      },
    },
  }),
});

module.exports = {
  globalMarketType,
  globalMarketEntryType,
  globalMarketOfferType,
};
