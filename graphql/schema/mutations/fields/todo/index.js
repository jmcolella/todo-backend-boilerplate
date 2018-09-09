const {
  GraphQLID,
} = require('graphql');
const TodoType = require('../../../types/todo/todoType');
const TodoInputType = require('../../../types/todo/todoInputType');
const Todo = require('../../../../../models/Todo').Todo;

exports.create = {
  type: TodoType,
  args: {
    input: {
      type: TodoInputType,
    }
  },
  resolve: (root, params) => (
    Todo
      .forge(params.input)
      .save()
      .then(todo => todo.attributes)
  )
};

exports.update = {
  type: TodoType,
  args: {
    input: {
      type: TodoInputType,
    },
    id: {
      type: GraphQLID,
    },
  },
  resolve: (root, params) => (
    Todo
      .where({ id: params.id })
      .fetch()
      .save(params.input, { method: 'update' })
      .then(todo => todo.attributes)
  )
};

exports.remove = {
  type: TodoType,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve: (root, params) => (
    Todo
      .where({ id: params.id })
      .fetch()
      .destroy()
      .then(todo => todo)
  )
};
