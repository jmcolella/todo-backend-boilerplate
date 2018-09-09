const { GraphQLObjectType } = require('graphql');

const { user } = require('./fields/user');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user,
  },
});

module.exports = QueryType;
