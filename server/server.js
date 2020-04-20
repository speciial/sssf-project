'use strict'
require("dotenv").config();
const express = require('express');
const app = express();
const db = require('./database/db');

const PORT = 3000;

app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to the Game</h1>');
});



db.on('connected', () => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
