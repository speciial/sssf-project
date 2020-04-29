import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import MaterialLink from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Materials from "./components/Materials";
import Buildings from "./components/Buildings";
import GlobalMarket from "./components/GlobalMarket";
import Profile from "./components/Profile";
import User from "./components/User";
import Signin from "./components/SignIn";
import Signup from "./components/SignUp";
import Chat from "./components/Chat";
import SearchUser from "./components/SearchUser";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  request: (operation) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
});

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MaterialLink color="inherit" href="#">
        SSSF Project
      </MaterialLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const App = () => {
  const socket = socketIOClient(ENDPOINT, { origins: "localhost:*" });

  return (
    <ApolloProvider client={client}>
      <Router>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/materials">Materials</Link>
              </li>
              <li>
                <Link to="/buildings">Buildings</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <SearchUser />
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/materials">
              <Materials />
            </Route>
            <Route path="/buildings">
              <Buildings />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/user/:username">
              <User />
            </Route>
            <Route path="/">
              <GlobalMarket />
            </Route>
          </Switch>
        </div>
        <footer>
          {<Chat chatName={"Global Chat"} socket={socket} />}
          <Box mt={8}>
            <Copyright />
          </Box>
        </footer>
      </Router>
    </ApolloProvider>
  );
};

export default App;
