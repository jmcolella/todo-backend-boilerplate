const { GraphQLObjectType } = require('graphql');

const {
  user,
  users,
} = require('./fields/user');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user,
    users,
  },
});

module.exports = QueryType;
