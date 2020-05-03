"use strict";

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const MaterialModel = require("../models/MaterialModel");
const MaterialRatioModel = require("../models/MaterialRatioModel");

const materialRatioType = new GraphQLObjectType({
  name: "materialRatio",
  fields: () => ({
    id: { type: GraphQLID },
    Material: {
      type: materialType,
      resolve: async (parent, args) => {
        try {
          return await MaterialModel.findById(parent.MaterialID);
        } catch (error) {
          return new Error(error);
        }
      },
    },
    Quantity: { type: GraphQLInt },
  }),
});

const materialType = new GraphQLObjectType({
  name: "material",
  fields: () => ({
    id: { type: GraphQLID },
    Name: { type: GraphQLString },
    Size: { type: GraphQLInt },
    Weight: { type: GraphQLInt },
    Picture: { type: GraphQLString },
    CraftingRecipe: {
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

const addMatRatioType = new GraphQLInputObjectType({
  name: "addMatRatioType",
  fields: () => ({
    MaterialID: { type: new GraphQLNonNull(GraphQLID) },
    Quantity: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

const modifyMatRatioType = new GraphQLInputObjectType({
  name: "modifyMatRatioType",
  fields: () => ({
    MaterialID: { type: new GraphQLNonNull(GraphQLID) },
    Quantity: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

module.exports = {
  materialType,
  materialRatioType,
  addMatRatioType,
  modifyMatRatioType,
};
