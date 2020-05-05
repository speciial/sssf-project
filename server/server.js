"use strict";

require("dotenv").config();

//Dep
const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const socket = require("./socketio/socket");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/db");

//Graphql
const graphqlHTTP = require("express-graphql");
const MyGraphQLSchema = require("./schemas/RootSchema");

//Pass
const passport = require("./utils/passport");

//Route
const MaterialRoute = require("./routes/MaterialRoute");
const UserRoute = require("./routes/UserRoute");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use("/", cors());

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to the Game</h1>");
});

app.use("/material", MaterialRoute);
app.use("/user", UserRoute);

app.use("/graphql", (req, res) => {
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
    context: { req, res },
  })(req, res);
});

socket(io, process.env.SOCKET_PORT || 4000);

process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV === "production") {
  require("./production")(app, db, process.env.PORT || 3000);
} else {
  require("./development")(app, db, process.env.PORT || 3000);
}
