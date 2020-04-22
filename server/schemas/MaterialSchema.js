'use strict';

const MaterialModel = require('../models/MaterialModel');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');

const materialType = new GraphQLObjectType({
  name: 'material',
  fields: () => ({
    id: { type: GraphQLID },
    Name: { type: GraphQLString },
    Size: { type: GraphQLInt },
    Weight: { type: GraphQLInt },
    Picture: { type: GraphQLString },
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
  },
  resolve: async (parent, args) => {
    try {
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
      return await MaterialModel.findByIdAndDelete(args.id);
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
  },
  resolve: async (parent, args) => {
    try {
      return await MaterialModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    } catch (error) {
      return new Error(error);
    }
  },
};

module.exports = {
  materials,
  material,
  addMaterial,
  deleteMaterial,
  modifyMaterial,
};
