import { gql } from "apollo-boost";

const materialQuery = gql`
  {
    materials {
      id
      Name
      Size
      Weight
      Picture
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

const sellMaterialsQuery = gql`
  mutation AddMarketEntry(
    $marketName: String!
    $user: ID!
    $suggestedPrice: Int!
    $materials: [addMatRatioType]!
  ) {
    addMarketEntry(
      MarketName: $marketName
      MarketEntry: {
        User: $user
        SuggestedPrice: $suggestedPrice
        Materials: $materials
      }
    ) {
      User {
        Username
      }
      SuggestedPrice
      Materials {
        Material {
          Name
        }
        Quantity
      }
    }
  }
`;

export { materialQuery, sellMaterialsQuery };
