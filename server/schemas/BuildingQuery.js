"use strict";

const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");

const { buildingType } = require("./BuildingType");

const BuildingModel = require("../models/BuildingModel");

const buildings = {
  type: new GraphQLList(buildingType),
  resolve: async (parent, args) => {
    try {
      return await BuildingModel.find({});
    } catch (error) {
      return new Error(error);
    }
  },
};

const building = {
  type: buildingType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args) => {
    try {
      return await BuildingModel.findById(args.id);
    } catch (error) {
      return new Error(error);
    }
  },
};

module.exports = {
  buildings,
  building,
};
