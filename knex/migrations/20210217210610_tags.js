exports.up = function (knex) {
  return knex.schema.createTable('tags', (t) => {
    t.increments('id').primary();
    t.string('tag').unique().notNullable();
    t.integer('userid').references('id').inTable('users').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tags');
};
