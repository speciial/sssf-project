'use strict';

const BuildingModel = require('../models/BuildingModel');
const MaterialModel = require('../models/MaterialModel');
const MaterialRatioModel = require('../models/MaterialRatioModel');

const {
  materialType,
  materialRatioType,
  addMatRatioType,
  modifyMatRatioType,
} = require('./MaterialSchema');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');

const buildingType = new GraphQLObjectType({
  name: 'building',
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

const addBuilding = {
  type: buildingType,
  args: {
    Name: { type: new GraphQLNonNull(GraphQLString) },
    Cost: { type: new GraphQLNonNull(GraphQLInt) },
    Picture: { type: new GraphQLNonNull(GraphQLString) },
    MaterialID: { type: new GraphQLNonNull(GraphQLID) },
    CraftingRecipe: {
      type: new GraphQLNonNull(new GraphQLList(addMatRatioType)),
    },
  },
  resolve: async (parent, args) => {
    try {
      const updatedCR = await Promise.all(
        args.CraftingRecipe.map(async (matRaio) => {
          const newMatRatio = new MaterialRatioModel(matRaio);
          await newMatRatio.save();
          return newMatRatio._id;
        })
      );
      args.CraftingRecipe = updatedCR;
      return await BuildingModel.create(args);
    } catch (error) {
      return new Error(error);
    }
  },
};

const deleteBuilding = {
  type: buildingType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args) => {
    try {
      const delBuilding = await BuildingModel.findByIdAndDelete(args.id);
      await delBuilding.CraftingRecipe.map(async (matRatio) => {
        await MaterialRatioModel.findByIdAndDelete(matRatio);
      });
      return delBuilding;
    } catch (error) {
      return new Error(error);
    }
  },
};

const modifyBuilding = {
  type: buildingType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    Name: { type: new GraphQLNonNull(GraphQLString) },
    Cost: { type: new GraphQLNonNull(GraphQLInt) },
    Picture: { type: new GraphQLNonNull(GraphQLString) },
    MaterialID: { type: new GraphQLNonNull(GraphQLID) },
    CraftingRecipe: {
      type: new GraphQLNonNull(new GraphQLList(modifyMatRatioType)),
    },
  },
  resolve: async (parent, args) => {
    try {
      const oldBuilding = await BuildingModel.findById(args.id);
      await oldBuilding.CraftingRecipe.map(async (matRaio) => {
        await MaterialRatioModel.findByIdAndDelete(matRaio);
      });

      const updatedCR = await Promise.all(
        args.CraftingRecipe.map(async (matRaio) => {
          const newMatRatio = new MaterialRatioModel(matRaio);
          await newMatRatio.save();
          return newMatRatio._id;
        })
      );
      args.CraftingRecipe = updatedCR;

      return await BuildingModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    } catch (error) {
      return new Error(error);
    }
  },
};

module.exports = {
  buildings,
  building,
  addBuilding,
  deleteBuilding,
  modifyBuilding,
};
