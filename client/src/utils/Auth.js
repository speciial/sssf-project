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

const saveUsernameAndIdToStorage = (userName, id, remember) => {
  if (remember) {
    localStorage.setItem("username", userName);
    localStorage.setItem("id", id);
  } else {
    sessionStorage.setItem("username", userName);
    localStorage.setItem("id", id);
  }
};

const getUsernameAndIdFromStorage = () => {
  const username =
    sessionStorage.getItem("username") || localStorage.getItem("username");
  const id = sessionStorage.getItem("id") || localStorage.getItem("id");
  return { username: username, id: id };
};

const disconnectUser = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("username");
  sessionStorage.removeItem("username");
  localStorage.removeItem("id");
  sessionStorage.removeItem("id");
};

module.exports = {
  isAuth,
  saveTokenToStorage,
  disconnectUser,
  saveUsernameAndIdToStorage,
  getUsernameAndIdFromStorage,
};
