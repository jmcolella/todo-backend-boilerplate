var Bookshelf = require('../db');
var User = require('./user');

var Todo = Bookshelf.Model.extend({
  tableName: 'todos',
  hasTimestamps: true,

  author() {
    this.belongsTo(User, 'user_id');
  }
});

var Todos = Bookshelf.Collection.extend({
  model: Todo,
});

module.exports = {
  Todo,
  Todos,
};
