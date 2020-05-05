/**
 * TODO:
 *  [ ] Assets
 *      [ ] Materials
 *          [ ] Silver Ore
 *          [x] Iron Ore
 *          [ ] Gold Ore
 *          [ ] Iron Ingots
 *          [ ] Silver Ingots
 *      [ ] Buildings
 *          [x] Lumberjack Hut
 *          [ ] Sawmill
 *          [x] Quary
 *          [ ] Iron Mine
 *          [ ] Silver Mine
 *          [ ] Gold Mine
 *          [ ] Iron Smeltery
 *          [ ] Silver Smeltery
 *          [ ] Gold Smeltery
 *          [x] Farm
 *          [x] Mill
 *          [x] Bakery
 *          [x] Fisher Hut
 *          [x] Winery
 *          [x] Blacksmith
 *          [x] Charcoal Kiln
 *          [ ] Jeweler
 *          [x] Tobacco Plantation
 *  [x] SideProfile
 *      [x] display product of buildings
 *      [x] add search user search bar
 *  [ ] Buildings Listing
 *      [ ] fix bug where building list won't load
 *      [x] use picture names
 *  [x] SearchUser
 *      [x] display public profile
 *  [ ] Database
 *      [x] fix pitcure names for buildings
 *      [ ] export database (dump)
 *  [ ] Error Handling
 *      [ ] Add error dialog to pages (where needed)
 *  [x] SignIn / SignUp
 *      [x] move to pages
 *
 */
import React from "react";

import { Switch, Route } from "react-router-dom";

import { Box } from "@material-ui/core";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Copyright from "./components/Copyright";
import ChatWidget from "./components/ChatWidget/ChatWidget";

// PAGES
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import User from "./pages/User";
import MaterialListing from "./pages/MaterialListing";
import BuildingListing from "./pages/BuildingListing";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://tradinggame.jelastic.metropolia.fi:11191";

const client = new ApolloClient({
  uri: "http://tradinggame.jelastic.metropolia.fi/graphql",
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
  const socket = socketIOClient(ENDPOINT, { origins: "*:*" });
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
          <Route exact path="/user/:username" render={() => <User />}></Route>
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
