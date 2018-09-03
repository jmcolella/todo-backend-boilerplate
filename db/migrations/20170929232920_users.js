exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (t) => {
      t.increments();
      t.string('username');
      t.string('password');
      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
