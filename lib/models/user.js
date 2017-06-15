'use strict';

const Types = require('sequelize/lib/data-types'),
  Model = require('sequelize/lib/model');

class User extends Model {
  static init(sequelize) {
    super.init({
      email: Types.STRING,
      username: Types.STRING,
      firstname: Types.STRING,
      lastname: Types.STRING,
      createdAt: {
        type: Types.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: Types.DATE,
        field: 'updated_at'
      },
      deletedAt: {
        type: Types.DATE,
        field: 'deleted_at'
      }
    },
    {
      sequelize,
      freezeTableName: true,
      timeStamps: true,
      paranoid: true,
      tableName: 'users'
    });
  }
}

module.exports = User;


