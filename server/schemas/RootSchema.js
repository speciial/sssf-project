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

const {
  buildings,
  building,
  addBuilding,
  deleteBuilding,
  modifyBuilding,
} = require("./BuildingSchema");

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
