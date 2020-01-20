const express = require('express');

const app = express();

const PORT = process.env.PORT || 7001;

app.use('/', function (req, res) {
  res.send('Working!!!')
});

app.listen(PORT, function () {
  console.log(`App running on PORT: ${PORT}`)
});