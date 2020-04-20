const {
    GraphQLObjectType,
    GraphQLSchema,
  } = require("graphql");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {}
});

const Mutation = new GraphQLObjectType({
    name: "MutationType",
    fields: {}
});



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
  });
  