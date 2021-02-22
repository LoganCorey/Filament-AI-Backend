const { Model } = require('objection');
const bcrypt = require('bcrypt');
const knex = require('../../knex/knex');
const emailValidator = require('./validators/emailValidator');
const AppError = require('../lib/appError');

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  async $beforeInsert() {
    if (!emailValidator(this.email)) {
      throw new AppError('Please enter a valid email address.', 400);
    }

    if (this.password !== this.passwordConfirm) {
      throw new AppError('Passwords are not the same.', 400);
    }
    // encrypt here to ensure passwords are always encrypted;
    this.passwordConfirm = undefined;
    this.password = await bcrypt.hash(this.password, 12);
  }

  async checkPassword(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      requried: ['email', 'password'],
      properties: {
        id: { type: 'integer' },
        phone: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
    };
  }
}

module.exports = User;
