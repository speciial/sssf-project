import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";
import { public_userQuery } from "../queries/UserQueries";
import UserTabs from "./UserTabs";

const User = () => {
  let { username } = useParams("");

  const [getUser, { data, error, loading }] = useLazyQuery(public_userQuery, {
    variables: {
      username: username,
    },
  });

  let user;
  useEffect(() => {
    getUser();
  }, [username, getUser]);

  if (loading) return <p>Loading ...</p>;

  if (error) {
    console.log(error);
    return <div>User not found</div>;
  }
  if (data) {
    user = data.public_user;
  }

  return user ? (
    <div>
      <h1>Public profile of {user.Username} !</h1>
      <p>Money : {user.Money}</p>
      <UserTabs user={user} />
    </div>
  ) : (
    <div>User not found</div>
  );
};

export default User;
