var Bookshelf = require('../db');
var User = require('./user');

var Post = Bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,

  author() {
    this.belongsTo(User, 'user_id');
  }
});

var Posts = Bookshelf.Collection.extend({
  model: Post,
});

module.exports = {
  Post,
  Posts,
};
