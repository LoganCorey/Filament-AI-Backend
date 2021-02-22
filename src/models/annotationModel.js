const { Model } = require('objection');
const knex = require('../../knex/knex');
const Tag = require('./tagModel')
Model.knex(knex);

class Annotation extends Model {
  static get tableName() {
    return 'annotations';
  }

  static relationMappings = {
    tags: {
      relation: Model.HasOneRelation,
      modelClass: Tag, // imported Objection class of "Project"
      join: {
        from: 'annotations.tagid',
        to: 'tags.id'
      }
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      requried: ['userid', 'snipppetid', 'tagid', 'annotation'],
      properties: {
        id: { type: 'integer' },
        userid: { type: 'integer' },
        tagid: { type: 'integer' },
        snippetid: { type: 'integer' },
        annotation: { type: 'string', minLength: 1 },
      },
    };
  }
}

module.exports = Annotation;
