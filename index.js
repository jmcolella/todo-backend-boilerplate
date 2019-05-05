const express = require('express');
const graphQLHTTP = require('express-graphql');
const path = require('path');
const initialize = require('express-initializers');
const jwt = require('jsonwebtoken');

const appSchema = require('./graphql/schema');
const User = require('./models/User');

const app = express();

const initOptions = {
  directory: path.join(__dirname, './initializers'),
};

const getGraphContext = (req) => {
  const tokenHeader = req.headers.authorization || '';
  const token = tokenHeader.replace(/^Bearer /, '');
  let user = null;

  if (token) {
    user = jwt.verify(token, process.env.TODO_JWT_SECRET);
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

  app.post('/user', (req, res) => {
    return User.forge().save()
      .then(model => {
        const token = jwt.sign(
          model.attributes.uuid, process.env.TODO_JWT_SECRET
        );

        res.status(200).send({ token });
      });
  });
});

module.exports = app;
