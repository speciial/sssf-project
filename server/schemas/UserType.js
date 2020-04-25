"use strict";
const MaterialModel = require("../models/MaterialModel");
const UserMaterialModel = require("../models/UserMaterialModel");

const { materialType } = require("./MaterialType");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
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

module.exports = {
  userMaterialType,
  userType,
};
