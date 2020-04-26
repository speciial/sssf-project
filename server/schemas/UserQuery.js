"use strict";
const UserModel = require("../models/UserModel");
const UserMaterialModel = require("../models/UserMaterialModel");
const Authcontroller = require("../controllers/AuthController");

const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

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
  type: userType,
  description: "Get user by token, authentication required.",
  resolve: async (parent, args, { req, res }) => {
    try {
      const result = await Authcontroller.checkAuth(req, res);
      result.token = "you have it already";
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};
const login = {
  type: userType,
  description: "Login with username and password to receive token.",
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args, { req, res }) => {
    req.body = args; // inject args to reqest body for passport
    try {
      const authResponse = await Authcontroller.login(req, res);
      return {
        id: authResponse.user._id,
        ...authResponse.user,
        Token: authResponse.token,
      };
    } catch (err) {
      throw new Error(err);
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
  login,
};
