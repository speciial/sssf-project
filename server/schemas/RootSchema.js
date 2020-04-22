const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const { users, addUser, modifyUser, deleteUser } = require('./UserSchema');

const {
  materials,
  material,
  addMaterial,
  deleteMaterial,
  modifyMaterial,
} = require('./MaterialSchema');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users,
    materials,
    material,
  },
});
const Mutation = new GraphQLObjectType({
  name: 'MutationType',
  fields: {
    addUser,
    modifyUser,
    deleteUser,
    addMaterial,
    deleteMaterial,
    modifyMaterial,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});