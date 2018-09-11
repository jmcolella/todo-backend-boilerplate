const {
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
} = require('graphql');

const TodoInputType = new GraphQLInputObjectType({
  name: 'TodoInputType',
  fields: {
    title: {
      description: 'Main title of todo',
      type: GraphQLString,
    },
    completed: {
      description: 'Boolean designating if todo has been completed',
      type: GraphQLBoolean,
    },
    userId: {
      description: 'Id for user the todo belongs to',
      type: GraphQLID,
    },
  }
});

module.exports = TodoInputType;
