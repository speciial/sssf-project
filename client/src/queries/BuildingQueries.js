import { gql } from "apollo-boost";

const buildingQuery = gql`
  {
    buildings {
      id
      Name
      Cost
      Picture
      MaterialID {
        id
        Name
      }
      CraftingRecipe {
        id
        Material {
          id
          Name
        }
        Quantity
      }
    }
  }
`;

const modifyBuildingMutation = gql`
  mutation ModifyBuilding(
    $id: ID!
    $name: String!
    $cost: Int!
    $picture: String!
    $materialID: ID!
    $craftingRecipe: [modifyMatRatioType]!
  ) {
    modifyBuilding(
      id: $id
      Name: $name
      Cost: $cost
      Picture: $picture
      MaterialID: $materialID
      CraftingRecipe: $craftingRecipe
    ) {
      id
      Name
      Cost
      Picture
    }
  }
`;

const addBuildingToUser = gql`
  mutation addBuildingToUser($User: ID!, $Building: ID!) {
    addBuildingToUser(User: $User, Building: $Building) {
      id
    }
  }
`;

export { buildingQuery, modifyBuildingMutation, addBuildingToUser };
