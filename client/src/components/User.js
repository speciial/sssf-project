import React from "react";
import { useParams } from "react-router-dom";

const User = () => {
  let { username } = useParams("");
  return (
    <div>
      <h1>Hello {username} !</h1>
    </div>
  );
};

export default User;
