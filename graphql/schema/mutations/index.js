const { GraphQLObjectType } = require('graphql');
const user = require('./types/user');
const todo = require('./types/todo');

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  fields: {
    user: {
      type: user,
      resolve() {
        return {};
      },
    },
    todo: {
      type: todo,
      resolve() {
        return {};
      },
    },
  },
});

module.exports = MutationType;
