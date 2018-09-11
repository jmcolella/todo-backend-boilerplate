const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const TodoType = require('../todo/todoType');
const Todos = require('../../../../models/Todo').Todos;

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: {
      description: 'Database id for user',
      type: GraphQLID,
    },
    username: {
      description: 'Unique screen name for user',
      type: GraphQLString,
    },
    password: {
      description: 'Secret password for user',
      type: GraphQLString,
    },
    todos: {
      description: 'Todos written by user',
      type: new GraphQLList(TodoType),
      resolve: (root) => (
        Todos
          .query()
          .where({ user_id: root.id }) // eslint-disable-line camelcase
          .select()
          .then(res => res)
      )
    },
  },
});

module.exports = UserType;
