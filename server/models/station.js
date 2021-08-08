import { INTEGER, STRING } from 'sequelize'

import database from '../config/database'

export default database.define('stations', {
  _id: {
    autoIncrement: true,
    type: INTEGER,
    primaryKey: true
  },
  description: {
    type: STRING
  },
  cordX: {
    type: STRING
  },
  cordY: {
    type: STRING
  }
}, {
  freezeTableName: true,
  tableName: 'station',
  timestamps: true
})
