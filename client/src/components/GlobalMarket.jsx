import React from 'react';

import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { userQuery } from '../queries/UserQueries';
import { isAuth, disconnectUser } from '../utils/Auth';

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

/**
 * TODO: 
 *  pass user (userid) to the entry so that we can compose the
 *  query for buying the entry 
 */
const GlobalMarket = () => {
  const history = useHistory();
  const {
    loading: marketLoading,
    error: marketError,
    data: marketData,
  } = useQuery(globalMarketQuery);
  const { loading: userLoading, error: userError, data: userData } = useQuery(
    userQuery
  );

  if (!isAuth()) {
    //if not auth redirect to loginpage
    history.push('/signin');
    return null;
  }

  if (userLoading || marketLoading) return <p>Loading</p>;

  if (userError) {
    disconnectUser();
    history.push('/signin', {
      messages: ['Error fetching login, please log in'],
    });
    return null;
  }
  if (marketError) console.log(marketError);

  const entries = marketData.marketByName.Entries;
  const user = userData.user;

  return (
    <div>
      <h1>Global Market</h1>
      {entries.map((entry) => {
        return <GlobalMarketEntry key={entry.id} entry={entry} user={user} />;
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
