const { Model } = require('objection');
const knex = require('../../knex/knex');

Model.knex(knex);

class Snippet extends Model {
  static get tableName() {
    return 'snippets';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      requried: ['userid', 'snipppet'],
      properties: {
        id: { type: 'integer' },
        userid: { type: 'integer' },
        snippet: { type: 'string', minLength: 1 },
      },
    };
  }
}

module.exports = Snippet;
