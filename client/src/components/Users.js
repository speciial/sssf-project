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

    return <h1>Hello {user.FirstName} !</h1>;
  }
};

export default Users;
