import { gql } from "apollo-boost";

const globalMarketQuery = gql`
  {
    marketByName(Name: "global") {
      id
      Name
      Entries {
        id
        User {
          id
          Username
        }
        SuggestedPrice
        Materials {
          id
          Material {
            id
            Name
            Picture
          }
          Quantity
        }
      }
    }
  }
`;

export { globalMarketQuery };
