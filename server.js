const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to the Game</h1>');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
