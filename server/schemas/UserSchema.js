"use strict";

const UserModel = require("../models/UserModel");
const MaterialModel = require("../models/MaterialModel");
const UserMaterialModel = require("../models/UserMaterialModel");
const { materialType } = require("./MaterialSchema");
const bcrypt = require("bcrypt");
const saltRound = 12; //okayish in 2020

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const userMaterialType = new GraphQLObjectType({
  name: "userMaterial",
  fields: () => ({
    id: { type: GraphQLID },
    Material: {
      type: materialType,
      resolve(parent, args) {
        return MaterialModel.findById(parent.Material);
      },
    },
    Quantity: { type: GraphQLInt },
  }),
});

const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLID },
    FirstName: { type: GraphQLString },
    LastName: { type: GraphQLString },
    Username: { type: GraphQLString },
    Email: { type: GraphQLString },
    Password: { type: GraphQLString },
    Materials: {
      type: new GraphQLList(userMaterialType),
      resolve: async (parent, args) => {
        try {
          return await UserMaterialModel.find({
            _id: { $in: parent.Materials },
          });
        } catch (error) {
          return new Error(error);
        }
      },
    },
  }),
});

const users = {
  type: new GraphQLList(userType),
  resolve: async (parent, args) => {
    try {
      return await UserModel.find({});
    } catch (e) {
      return new Error(e);
    }
  },
};

const user = {
  type: new GraphQLList(userType),
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args) => {
    try {
      return await UserModel.findById(args.id);
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

const userMaterials = {
  type: new GraphQLList(userMaterialType),
  resolve: async (parent, args) => {
    try {
      return await UserMaterialModel.find({});
    } catch (e) {
      return new Error(e);
    }
  },
};

const updateUserMaterial = {
  type: userMaterialType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    Material: { type: new GraphQLNonNull(GraphQLID) },
    Quantity: { type: new GraphQLNonNull(GraphQLInt) },
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

module.exports = {
  users,
  user,
  addUser,
  modifyUser,
  deleteUser,
  addMaterialToUser,
  userMaterials,
  updateUserMaterial,
};
