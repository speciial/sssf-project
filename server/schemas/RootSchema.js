const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const { users, user, userMaterials } = require("./UserQuery");

const {
  addUser,
  modifyUser,
  deleteUser,
  addMaterialToUser,
  updateUserMaterial,
} = require("./UserMutation");

const { materials, material } = require("./MaterialQuery");

const {
  addMaterial,
  deleteMaterial,
  modifyMaterial,
} = require("./MaterialMutation");

const { buildings, building } = require("./BuildingQuery");

const {
  addBuilding,
  deleteBuilding,
  modifyBuilding,
} = require("./BuildingMutation");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users,
    user,
    materials,
    material,
    userMaterials,
    buildings,
    building,
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
    addBuilding,
    deleteBuilding,
    modifyBuilding,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

/*
{
  "data": {
    "materials": [
      {
        "id": "5ea19af49cadda35e039c75b",
        "Name": "Trees"
      },
      {
        "id": "5ea19b169cadda35e039c75d",
        "Name": "Wood"
      }
    ]
  }
}
 */
