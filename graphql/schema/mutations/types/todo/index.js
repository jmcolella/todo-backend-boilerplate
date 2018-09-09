const { GraphQLObjectType } = require('graphql');
const {
  create,
  update,
  remove,
} = require('../../fields/todo');

const TodoMutationType = new GraphQLObjectType({
  name: 'TodoMutationType',
  fields: {
    create,
    update,
    remove,
  },
});

module.exports = TodoMutationType;
