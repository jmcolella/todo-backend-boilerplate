const {
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
} = require('graphql');

const TodoType = new GraphQLObjectType({
  name: 'TodoType',
  fields: {
    id: {
      description: 'Unique id for todo',
      type: GraphQLID,
    },
    title: {
      description: 'Main title of todo',
      type: GraphQLString,
    },
    completed: {
      description: 'Boolean designating if todo has been completed',
      type: GraphQLBoolean,
    },
  }
});

module.exports = TodoType;
