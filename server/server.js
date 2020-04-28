"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const socketIo = require("socket.io");
const io = socketIo(http);
const socket = require("./socketio/socket");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/db");
const graphqlHTTP = require("express-graphql");
const MyGraphQLSchema = require("./schemas/RootSchema");
const passport = require("./utils/passport");

const MaterialRoute = require("./routes/MaterialRoute");
const UserRoute = require("./routes/UserRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", cors());

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to the Game</h1>");
});

app.use("/material", MaterialRoute);
app.use("/user", UserRoute);

app.use(passport.initialize());

app.use("/graphql", (req, res) => {
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
    context: { req, res },
  })(req, res);
});

socket(io, process.env.SOCKET_PORT, 20);

db.on("connected", () => {
  app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}`)
  );
});
