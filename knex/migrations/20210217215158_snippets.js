exports.up = function (knex) {
  return knex.schema.createTable('snippets', (t) => {
    t.increments('id');
    t.integer('userid').references('id').inTable('users').notNullable();
    t.text('snippet', 'longtext').unique().notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('snippets');
};
