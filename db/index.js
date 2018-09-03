var Bookshelf = require('bookshelf');
var knex = require('knex');
var knexConfig = require('./knexfile');

module.exports =
  Bookshelf(knex(knexConfig)).plugin([
    'bookshelf-camelcase'
  ]);
