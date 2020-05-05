'use strict';

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const { materialRatioType, addMatRatioType } = require('./MaterialType');
const { userType } = require('./UserType');

const UserModel = require('../models/UserModel');
const MaterialRatioModel = require('../models/MaterialRatioModel');

const MarketEntryModel = require('../models/MarketEntryModel');
const MarketOfferModel = require('../models/MarketOfferModel');

/**
 * NOTE:
 *  This is implemented in such a way, that there is the
 *  possibility for more than one market, incase we want
 *  to later implement the notion of city, to which the
 *  player can travel and buy things.
 */
const marketType = new GraphQLObjectType({
  name: 'market',
  fields: () => ({
    id: { type: GraphQLID },
    Name: { type: GraphQLString },
    Entries: {
      type: new GraphQLList(marketEntryType),
      resolve: async (parent, args) => {
        try {
          return await MarketEntryModel.find({ _id: parent.Entries });
        } catch (error) {
          return new Error(error);
        }
      },
    },
  }),
});

const marketEntryType = new GraphQLObjectType({
  name: 'marketEntry',
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
          return await MaterialRatioModel.find({ _id: parent.Materials });
        } catch (error) {
          return new Error(error);
        }
      },
    },
    Offers: {
      type: new GraphQLList(marketOfferType),
      resolve: async (parent, args) => {
        try {
          return await MarketOfferModel.find({ _id: parent.Offers });
        } catch (error) {
          return new Error(error);
        }
      },
    },
  }),
});

const marketOfferType = new GraphQLObjectType({
  name: 'marketOffer',
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

/**
 * NOTE:
 *  The Offers can be null / empty, because when creating a
 *  new entry, there are obviously no offers set.
 *  Incase we need to move things inside the DB the options
 *  to fully copy an entry is still there.
 */
const addMarketEntryType = new GraphQLInputObjectType({
  name: 'addMarketEntryType',
  fields: () => ({
    User: { type: new GraphQLNonNull(GraphQLID) },
    SuggestedPrice: { type: new GraphQLNonNull(GraphQLInt) },
    Materials: { type: new GraphQLNonNull(new GraphQLList(addMatRatioType)) },
    Offers: { type: new GraphQLList(new GraphQLList(addMarketOfferType)) },
  }),
});

/**
 * NOTE:
 *  The Materials array here can be empty, because we don't
 *  require the user to offer materials. Though a gold offer
 *  is required!
 */
const addMarketOfferType = new GraphQLInputObjectType({
  name: 'addMarketOfferType',
  fields: () => ({
    User: { type: new GraphQLNonNull(GraphQLID) },
    Message: { type: new GraphQLNonNull(GraphQLString) },
    MoneyOffer: { type: new GraphQLNonNull(GraphQLInt) },
    Materials: { type: new GraphQLList(addMatRatioType) },
  }),
});

module.exports = {
  marketType,
  marketEntryType,
  marketOfferType,
  addMarketEntryType,
  addMarketOfferType,
};
