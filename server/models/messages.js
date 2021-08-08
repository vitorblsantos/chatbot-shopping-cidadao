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
    references: { model: Users, key: '_id' }
  }
}, {
  freezeTableName: true,
  tableName: 'messages',
  timestamps: true
})

module.exports = Messages
