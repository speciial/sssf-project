"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/db");
const graphqlHTTP = require("express-graphql");
const MyGraphQLSchema = require("./schemas/RootSchema");
const passport = require("./utils/passport");

const AuthRoute = require("./routes/AuthRoute");
const MaterialRoute = require("./routes/MaterialRoute");
const UserRoute = require("./routes/UserRoute");

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", cors());

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to the Game</h1>");
});

app.use("/material", MaterialRoute);
app.use("/user", UserRoute);
app.use("/auth", AuthRoute);

app.use(passport.initialize());

const checkAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user) {
      throw new Error("Not authenticated");
    }
  })(req, res, next);
};

app.use("/graphql", (req, res) => {
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
    context: { req, res, checkAuth },
  })(req, res);
});

db.on("connected", () => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
