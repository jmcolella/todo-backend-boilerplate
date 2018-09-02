const knex = {
  client: 'postgresql',
  connection: {
    host: '127.0.0.1',
    database: process.env.DATABASE_NAME
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations',
  },
};

module.exports = knex;
