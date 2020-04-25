const isAuth = () => {
  if (getAuthUserId() === null) {
    return false;
  } else {
    return true;
  }
};

const getAuthUserId = () => {
  return localStorage.getItem("id") || sessionStorage.getItem("id");
};

const authUser = (id, token, remember) => {
  if (remember) {
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
  } else {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("id", id);
  }
};

const disconnectUser = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("id");
  sessionStorage.removeItem("id");
};

module.exports = {
  isAuth,
  getAuthUserId,
  authUser,
  disconnectUser,
};
