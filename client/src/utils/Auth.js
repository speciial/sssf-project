const isAuth = () => {
  if (
    localStorage.getItem("token") !== null ||
    sessionStorage.getItem("token") !== null
  ) {
    return true;
  } else {
    return false;
  }
};

const saveTokenToStorage = (token, remember) => {
  if (remember) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
};

const saveUsernameToStorage = (userName, remember) => {
  if (remember) {
    localStorage.setItem("username", userName);
  } else {
    sessionStorage.setItem("username", userName);
  }
};

const disconnectUser = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("username");
  sessionStorage.removeItem("username");
};

module.exports = {
  isAuth,
  saveTokenToStorage,
  disconnectUser,
  saveUsernameToStorage,
};
