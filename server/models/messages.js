const { INTEGER, STRING } = require('sequelize')

const { Users } = require('./index')

const Database = require('../sequelize')

const Messages = Database.define('messages', {
  _id: {
    autoIncrement: true,
    type: INTEGER,
    primaryKey: true
  },
  content: {
    type: STRING(150)
  },
  session: {
    type: INTEGER
  },
  user: {
    type: INTEGER,
    references: {
      key: '_id',
      model: Users
    }
  }
}, {
  freezeTableName: true,
  tableName: 'messages',
  timestamps: true
})

Messages.hasOne(Users, {
  onDelete: 'cascade',
  onUpdate: 'cascade'
})

module.exports = Messages
