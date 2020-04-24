import React from "react";
import { useHistory } from "react-router-dom";
import { isAuth, getAuthUser } from "../utils/Auth";

const Users = () => {
  const history = useHistory();
  if (!isAuth()) {
    //if not auth redirect to loginpage
    history.push("/signin");
    return null;
  } else {
    const user = getAuthUser();

    return (
      <div>
        <h1>Hello {user.FirstName} !</h1>
        <p>First name : {user.FirstName}</p>
        <p>Last name : {user.LastName}</p>
        <p>Username : {user.Username}</p>
        <p>Email : {user.Email}</p>
      </div>
    );
  }
};

export default Users;
