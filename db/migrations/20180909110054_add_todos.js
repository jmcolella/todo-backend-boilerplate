exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('todos', (table) => {
      table.increments();
      table.string('title');
      table.boolean('completed');
      table.integer('user_id');

      table.foreign('user_id').references('id').inTable('users');

      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('todos')
  ]);
};
