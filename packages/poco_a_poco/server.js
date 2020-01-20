const express = require('express');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql');
const cors = require('cors');
const schema = require('./src/schema');

const app = express();

const PORT = process.env.PORT || 7001;

mongoose.connect('mongodb://localhost/poco_a_poco', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('We are connected!'))
  .catch(error => console.log(error));

app.use(cors());

app.use('/graphql', graphqlHttp({
  schema,
  graphiql: true
}));

app.listen(PORT, function () {
  console.log(`App running on PORT: ${PORT}`)
});