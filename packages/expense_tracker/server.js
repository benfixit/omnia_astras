const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./src/schema');

const app = express();

const PORT = process.env.PORT || 4000;

app.set('PORT', PORT);

mongoose.connect('mongodb://localhost/expense_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to DB')).catch(err => console.log(err));

app.use(cors());

app.use('/graphql', graphqlHttp({
  schema,
  graphiql: true
}));

app.listen(app.get('PORT'), () => {
  console.log(`App now listening on PORT: ${app.get('PORT')}`);
});
