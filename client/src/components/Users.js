import React from "react";
import { useHistory } from "react-router-dom";
import { isAuth } from "../utils/Auth";

const Users = () => {
  const history = useHistory();
  if (!isAuth()) {
    //if not auth redirect to loginpage
    history.push("/signin");
  }

  const user = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user")
  );

  return <h1>Hello {user.FirstName} !</h1>;
};

export default Users;
