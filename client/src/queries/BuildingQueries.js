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
          Name
        }
        Quantity
      }
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

export { buildingQuery, addBuildingToUser };
