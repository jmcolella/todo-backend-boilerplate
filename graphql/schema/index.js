const { GraphQLSchema } = require('graphql');
const QueryType = require('./queries');
const MutationType = require('./mutations');

const appSchema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

module.exports = appSchema;

