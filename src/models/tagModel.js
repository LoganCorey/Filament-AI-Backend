const { Model } = require('objection');
const knex = require('../../knex/knex');
const ConditionalBuilder = require('./query-builders/conditionalMethods');

Model.knex(knex);

class Tag extends Model {
  static get tableName() {
    return 'tags';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      requried: ['userid', 'tag'],
      properties: {
        id: { type: 'integer' },
        userid: { type: 'integer' },
        tag: { type: 'string', minLength: 1 },
      },
    };
  }

  static get QueryBuilder() {
    return ConditionalBuilder;
  }
}

module.exports = Tag;
