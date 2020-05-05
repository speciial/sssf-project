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

const buyEntryMutation = gql`
  mutation BuyMarketEntry($user: ID!, $marketEntry: ID!) {
    buyMarketEntry(UserId: $user, MarketEntryId: $marketEntry) {
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
        }
        Quantity
      }
    }
  }
`;

export { globalMarketQuery, buyEntryMutation };
