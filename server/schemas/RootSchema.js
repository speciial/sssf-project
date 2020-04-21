const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const { users, addUser, modifyUser, deleteUser } = require("./UserSchema");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users,
  },
});
const Mutation = new GraphQLObjectType({
  name: "MutationType",
  fields: {
    addUser,
    modifyUser,
    deleteUser,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
