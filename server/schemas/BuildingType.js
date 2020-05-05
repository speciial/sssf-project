"use strict";

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");

const { materialType, materialRatioType } = require("./MaterialType");

const MaterialModel = require("../models/MaterialModel");
const MaterialRatioModel = require("../models/MaterialRatioModel");

const buildingType = new GraphQLObjectType({
  name: "building",
  fields: () => ({
    id: { type: GraphQLID },
    Name: { type: GraphQLString },
    Cost: { type: GraphQLInt },
    Picture: { type: GraphQLString },
    MaterialID: {
      type: materialType,
      resolve: async (parent, args) => {
        try {
          return await MaterialModel.findById(parent.MaterialID);
        } catch (error) {
          return new Error(error);
        }
      },
    },
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

module.exports = {
  buildingType,
};
