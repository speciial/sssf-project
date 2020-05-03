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
  description: "Return the list of users",
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
      return new Error(err);
    }
  },
};

const public_user = {
  type: userType,
  description: "Get public user by username",
  args: {
    Username: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      const user = await UserModel.findOne({
        Username: { $regex: new RegExp(args.Username, "i") },
      });

      const strippedUser = {
        Username: user.Username,
        Materials: user.Materials,
        Buildings: user.Buildings,
        Money: user.Money,
      };
      return strippedUser;
    } catch (e) {
      return new Error(e);
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
  description: "Return the list of user material entry",
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
  public_user,
};
