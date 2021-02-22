exports.up = function (knex) {
  return knex.schema.createTable('annotations', (t) => {
    t.increments('id').primary();
    t.integer('userid').references('id').inTable('users').notNullable();
    t.integer('tagid').references('id').inTable('tags').notNullable();
    t.integer('snippetid').references('id').inTable('snippets').notNullable();
    t.string('annotation').unique().notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('annotations');
};
