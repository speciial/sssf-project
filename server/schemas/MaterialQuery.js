"use strict";

const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");

const MaterialModel = require("../models/MaterialModel");

const { materialType } = require("./MaterialType");

const materials = {
  type: new GraphQLList(materialType),
  resolve: async (parent, args) => {
    try {
      return await MaterialModel.find({});
    } catch (error) {
      return new Error(error);
    }
  },
};

const material = {
  type: materialType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args) => {
    try {
      return await MaterialModel.findById(args.id);
    } catch (error) {
      return new Error(error);
    }
  },
};

module.exports = {
  materials,
  material,
};
