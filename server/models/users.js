import { INTEGER, STRING } from 'sequelize'

const database = require('../sequelize')

export default database.define('users', {
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
