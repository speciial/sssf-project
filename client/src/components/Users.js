import React from "react";
import { useHistory } from "react-router-dom";
import { isAuth, getAuthUserId, disconnectUser } from "../utils/Auth";
import Button from "@material-ui/core/Button";
import UserTabs from "./UserTabs";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
const userQuery = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      FirstName
      LastName
      Username
      Email
      Materials {
        id
        Material {
          id
          Name
          Size
          Weight
          Picture
          CraftingRecipe {
            id
            Material {
              id
            }
            Quantity
          }
        }
        Quantity
      }
    }
  }
`;
const Users = () => {
  const history = useHistory();
  const { loading, data } = useQuery(userQuery, {
    variables: { id: getAuthUserId() },
  });

  if (!isAuth()) {
    //if not auth redirect to loginpage
    history.push("/signin");
    return null;
  }

  if (loading) return <p>Loading ...</p>;

  const user = data.user;

  const disconnect = (e) => {
    disconnectUser();
    history.push("/signin");
  };

  return (
    <div>
      <h1>Hello {user.FirstName} !</h1>
      <UserTabs user={user} />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={disconnect}
      >
        Disconnect
      </Button>
    </div>
  );
};

export default Users;
