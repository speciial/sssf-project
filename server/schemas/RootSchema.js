const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const {
  users,
  user,
  addUser,
  modifyUser,
  deleteUser,
  addMaterialToUser,
  userMaterials,
  updateUserMaterial,
} = require("./UserSchema");

const {
  materials,
  material,
  addMaterial,
  deleteMaterial,
  modifyMaterial,
} = require("./MaterialSchema");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users,
    user,
    materials,
    material,
    userMaterials,
  },
});
const Mutation = new GraphQLObjectType({
  name: "MutationType",
  fields: {
    addUser,
    modifyUser,
    deleteUser,
    addMaterial,
    deleteMaterial,
    modifyMaterial,
    addMaterialToUser,
    updateUserMaterial,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
