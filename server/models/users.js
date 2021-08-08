const { INTEGER, STRING } = require('sequelize')

const { Messages } = require('../models/')

const Database = require('../sequelize')

const Users = Database.define('users', {
  _id: {
    autoIncrement: true,
    type: INTEGER,
    primaryKey: true
  },
  document: {
    type: STRING(11)
  },
  email: {
    type: STRING(100)
  },
  name: {
    type: STRING(100)
  }
}, {
  freezeTableName: true,
  tableName: 'users',
  timestamps: true
})

Users.hasMany(Messages, {
  foreignKey: 'user',
  sourceKey: '_id'
})

module.exports = Users
