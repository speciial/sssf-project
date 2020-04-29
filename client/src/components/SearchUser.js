import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SearchUser() {
  const [username, setusername] = useState("");
  const history = useHistory();
  const searchusername = (e) => {
    history.push(`/user/${username}`);
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setusername(e.target.value)}
        value={username}
        placeholder="Username"
      />
      <button onClick={searchusername}>Search user</button>
    </div>
  );
}

export default SearchUser;
