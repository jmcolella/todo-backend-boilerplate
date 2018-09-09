var bcrypt = require('bcrypt');
var Bookshelf = require('../db');
var Todo = require('./Todo').Todo;

const saltRounds = 10;

var User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  posts() {
    return this.hasMany(Todo, 'user_id');
  },
});

User.hashPassword = (password) => bcrypt.hash(password, saltRounds);
User.validatePassword = (password, dbHash) => bcrypt.compare(password, dbHash);

module.exports = User;
