import React from "react";

import { Switch, Route } from "react-router-dom";

import { Box } from "@material-ui/core";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Copyright from "./components/Copyright";
import ChatWidget from "./components/ChatWidget";

// PAGES
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MaterialListing from "./pages/MaterialListing";
import BuildingListing from "./pages/BuildingListing";

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

const App = () => {
  const socket = socketIOClient(ENDPOINT, { origins: "localhost:*" });
  console.log(socket);

  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <Switch>
          {" "}
          <Route exact path="/" render={() => <Home />}></Route>
          <Route exact path="/signin" render={() => <SignIn />}></Route>
          <Route exact path="/signup" render={() => <SignUp />}></Route>
          <Route exact path="/profile" render={() => <Profile />}></Route>
          <Route
            exact
            path="/materials"
            render={() => <MaterialListing />}
          ></Route>
          <Route
            exact
            path="/buildings"
            render={() => <BuildingListing />}
          ></Route>
        </Switch>
        <footer>
          <ChatWidget socket={socket} />
          <Box mt={4}>
            <Copyright />
          </Box>
        </footer>
      </ApolloProvider>
    </React.Fragment>
  );
};

export default App;
