"use strict";

const UserModel = require("../models/UserModel");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");

const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLID },
    Name: { type: GraphQLString },
    Username: { type: GraphQLString },
    Email: { type: GraphQLString },
    Password: { type: GraphQLString },
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
    Name: { type: new GraphQLNonNull(GraphQLString) },
    Username: { type: new GraphQLNonNull(GraphQLString) },
    Email: { type: new GraphQLNonNull(GraphQLString) },
    Password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      return await UserModel.create(args);
    } catch (e) {
      return new Error(e);
    }
  },
};

const modifyUser = {
  type: userType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    Name: { type: GraphQLString },
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
  users,
  user,
  addUser,
  modifyUser,
  deleteUser,
};
