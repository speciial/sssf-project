import React from 'react';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import GlobalMarketEntry from './GlobalMarketEntry';

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

const GlobalMarket = () => {
  const { loading, error, data } = useQuery(globalMarketQuery);

  if (loading) return <p>Loading</p>;

  if (error) console.log(error);

  console.log(data);

  const entries = data.marketByName.Entries;

  return (
    <div>
      <h1>Global Market</h1>
      {entries.map((entry) => {
        return <GlobalMarketEntry key={entry.id} entry={entry} />;
      })}
    </div>
  );
};

export default GlobalMarket;

/*
  "data": {
    "markets": [
      {
        "Name": "global",
        "Entries": [
          {
            "User": {
              "Username": "test"
            },
            "SuggestedPrice": 3000,
            "Materials": [
              {
                "Material": {
                  "Name": "Trees",
                  "Picture": "Trees"
                },
                "Quantity": 50
              }
            ]
          }
        ]
      }
    ]
  }
 */
