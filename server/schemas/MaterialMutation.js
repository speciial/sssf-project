"use strict";

const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const Authcontroller = require("../controllers/AuthController");

const MaterialModel = require("../models/MaterialModel");
const MaterialRatioModel = require("../models/MaterialRatioModel");

const {
  materialType,
  addMatRatioType,
  modifyMatRatioType,
} = require("./MaterialType");

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
  resolve: async (parent, args, { req, res }) => {
    try {
      await Authcontroller.checkAuth(req, res);
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
  resolve: async (parent, args, { req, res }) => {
    try {
      await Authcontroller.checkAuth(req, res);
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
  resolve: async (parent, args, { req, res }) => {
    try {
      await Authcontroller.checkAuth(req, res);
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
  addMatRatioType,
  modifyMatRatioType,
  addMaterial,
  deleteMaterial,
  modifyMaterial,
};
