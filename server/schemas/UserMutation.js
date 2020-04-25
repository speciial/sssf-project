"use strict";
const bcrypt = require("bcrypt");
const saltRound = 12; //okayish in 2020

const UserModel = require("../models/UserModel");
const UserMaterialModel = require("../models/UserMaterialModel");

const {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const { userType, userMaterialType } = require("./UserType");

const updateUserMaterial = {
  type: userMaterialType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    Material: { type: GraphQLID },
    Quantity: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    try {
      return await UserMaterialModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    } catch (e) {
      return new Error(e);
    }
  },
};

const addMaterialToUser = {
  type: userType,
  args: {
    User: { type: new GraphQLNonNull(GraphQLID) },
    Material: { type: new GraphQLNonNull(GraphQLID) },
    Quantity: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args) => {
    try {
      const newUserMaterial = await UserMaterialModel.create({
        Material: args.Material,
        Quantity: args.Quantity,
      });
      const user = await UserModel.findById(args.User);
      if (!user.Materials) {
        user.Materials = [];
      }
      user.Materials.push(newUserMaterial.id);
      return await UserModel.findByIdAndUpdate(args.User, user, { new: true });
    } catch (e) {
      return new Error(e);
    }
  },
};

const addBuildingToUser = {
  type: userType,
  args: {
    User: { type: new GraphQLNonNull(GraphQLID) },
    Building: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args) => {
    try {
      const user = await UserModel.findById(args.User);
      if (!user.Buildings) {
        user.Buildings = [];
      }
      user.Buildings.push(args.Building);
      return await UserModel.findByIdAndUpdate(args.User, user, { new: true });
    } catch (e) {
      return new Error(e);
    }
  },
};

const addUser = {
  type: userType,
  args: {
    FirstName: { type: new GraphQLNonNull(GraphQLString) },
    LastName: { type: new GraphQLNonNull(GraphQLString) },
    Username: { type: new GraphQLNonNull(GraphQLString) },
    Email: { type: new GraphQLNonNull(GraphQLString) },
    Password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      args.Password = await bcrypt.hash(args.Password, saltRound);
      const newUser = await UserModel.create(args);
      await delete newUser.Password;
      return newUser;
    } catch (e) {
      return new Error(e);
    }
  },
};

const modifyUser = {
  type: userType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    FirstName: { type: GraphQLString },
    LastName: { type: GraphQLString },
    Username: { type: GraphQLString },
    Email: { type: GraphQLString },
    Password: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    try {
      return await UserModel.findByIdAndUpdate(args.id, args, { new: true });
    } catch (e) {
      return new Error(e);
    }
  },
};

const deleteUser = {
  type: userType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args) => {
    try {
      return await UserModel.findByIdAndDelete(args.id);
    } catch (e) {
      return new Error(e);
    }
  },
};

module.exports = {
  addUser,
  modifyUser,
  deleteUser,
  addMaterialToUser,
  updateUserMaterial,
  addBuildingToUser,
};
