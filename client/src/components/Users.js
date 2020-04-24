import React from "react";
import { useHistory } from "react-router-dom";
import { isAuth, getAuthUser, disconnectUser } from "../utils/Auth";
import Button from "@material-ui/core/Button";

const Users = () => {
  const history = useHistory();
  if (!isAuth()) {
    //if not auth redirect to loginpage
    history.push("/signin");
    return null;
  } else {
    const user = getAuthUser();

    const disconnect = (e) => {
      disconnectUser();
      history.push("/signin");
    };

    return (
      <div>
        <h1>Hello {user.FirstName} !</h1>
        <p>First name : {user.FirstName}</p>
        <p>Last name : {user.LastName}</p>
        <p>Username : {user.Username}</p>
        <p>Email : {user.Email}</p>
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
  }
};

export default Users;
