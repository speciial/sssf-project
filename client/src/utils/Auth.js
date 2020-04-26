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

const disconnectUser = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};

module.exports = {
  isAuth,
  saveTokenToStorage,
  disconnectUser,
};
