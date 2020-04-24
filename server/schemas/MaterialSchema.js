"use strict";

const MaterialModel = require("../models/MaterialModel");
const MaterialRatioModel = require("../models/MaterialRatioModel");

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

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

const addMaterial = {
  type: materialType,
  args: {
    Name: { type: new GraphQLNonNull(GraphQLString) },
    Size: { type: new GraphQLNonNull(GraphQLInt) },
    Weight: { type: new GraphQLNonNull(GraphQLInt) },
    Picture: { type: new GraphQLNonNull(GraphQLString) },
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
      return await MaterialModel.create(args);
    } catch (error) {
      return new Error(error);
    }
  },
};

const deleteMaterial = {
  type: materialType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args) => {
    try {
      const delMaterial = await MaterialModel.findByIdAndDelete(args.id);
      await delMaterial.CraftingRecipe.map(async (matRaio) => {
        await MaterialRatioModel.findByIdAndDelete(matRaio);
      });
      return delMaterial;
    } catch (error) {
      return new Error(error);
    }
  },
};

const modifyMaterial = {
  type: materialType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    Name: { type: new GraphQLNonNull(GraphQLString) },
    Size: { type: new GraphQLNonNull(GraphQLInt) },
    Weight: { type: new GraphQLNonNull(GraphQLInt) },
    Picture: { type: new GraphQLNonNull(GraphQLString) },
    CraftingRecipe: {
      type: new GraphQLNonNull(new GraphQLList(modifyMatRatioType)),
    },
  },
  resolve: async (parent, args) => {
    try {
      const oldMaterial = await MaterialModel.findById(args.id);
      await oldMaterial.CraftingRecipe.map(async (matRaio) => {
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

      return await MaterialModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    } catch (error) {
      return new Error(error);
    }
  },
};

module.exports = {
  materialType,
  materialRatioType,
  addMatRatioType,
  modifyMatRatioType,
  materials,
  material,
  addMaterial,
  deleteMaterial,
  modifyMaterial,
  materialType,
};
