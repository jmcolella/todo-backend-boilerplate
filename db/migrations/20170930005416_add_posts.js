exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', (t) => {
      t.increments();
      t.string('title');
      t.string('body');
      t.integer('user_id').references('users.id');
      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('posts')
  ]);
};
