import React from "react";

import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { userQuery } from "../queries/UserQueries";
import Button from "@material-ui/core/Button";
import UserTabs from "./ProfileTabs";
import { isAuth, disconnectUser } from "../utils/Auth";

const Profile = () => {
  const history = useHistory();
  const { loading, error, data } = useQuery(userQuery);

  if (!isAuth()) {
    //if not auth redirect to loginpage
    history.push("/signin");
    return null;
  }

  if (loading) return <p>Loading ...</p>;

  if (error) {
    disconnectUser();
    history.push("/signin", {
      messages: ["Error fetching login, please log in"],
    });
    return null;
  }
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

export default Profile;
