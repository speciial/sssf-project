const isAuth = () => {
  if (getAuthUser() === null) {
    return false;
  } else {
    return true;
  }
};

const getAuthUser = () => {
  return JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user")
  );
};

const authUser = (user, token, remember) => {
  if (remember) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);
  }
};

const disconnectUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
};

module.exports = {
  isAuth,
  getAuthUser,
  authUser,
  disconnectUser,
};
