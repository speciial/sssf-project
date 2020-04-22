import React from "react";
import { useHistory } from "react-router-dom";

const Users = () => {
  const history = useHistory();
  console.log("user", localStorage.getItem("user"));
  if (localStorage.getItem("user") === null) {
    //if not auth redirect to loginpage
    history.push("/signin");
  } else {
  }

  return <h1>Users</h1>;
};

export default Users;
