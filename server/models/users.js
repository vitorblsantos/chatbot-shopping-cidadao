import { INTEGER, STRING } from 'sequelize'

import database from '../config/database'

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
