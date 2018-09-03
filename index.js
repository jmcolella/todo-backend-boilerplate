const express = require('express');
const graphQLHTTP = require('express-graphql');
const path = require('path');
const initialize = require('express-initializers');
const jwt = require('jsonwebtoken');
const setup = require('./middlewares/frontendMiddlewares');

const appSchema = require('./graphql/schema');

const app = express();

const initOptions = {
  directory: path.join(__dirname, './initializers'),
};

const getGraphContext = (req) => {
  const tokenHeader = req.headers.authorization || '';
  const token = tokenHeader.replace(/^Bearer /, '');
  let user = null;

  if (token) {
    user = jwt.verify(token, 'your_jwt_secret');
  }

  return { user };
};

initialize(app, initOptions).then(() => {
  app.use('/api/graphql', graphQLHTTP(
    (req, res) => ({
      schema: appSchema,
      context: getGraphContext(req, res),
      graphiql: true,
    })
  ));

  setup(app);
});

module.exports = app;
