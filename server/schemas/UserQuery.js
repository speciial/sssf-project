"use strict";
const UserModel = require("../models/UserModel");
const UserMaterialModel = require("../models/UserMaterialModel");

const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");

const { userType, userMaterialType } = require("./UserType");

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

module.exports = {
  users,
  user,
  userMaterials,
};
