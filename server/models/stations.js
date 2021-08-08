import { INTEGER, STRING } from 'sequelize'

const database = require('../sequelize/')

export default database.define('stations', {
  _id: {
    autoIncrement: true,
    type: INTEGER,
    primaryKey: true
  },
  description: {
    type: STRING(100)
  },
  latitude: {
    type: STRING(12)
  },
  longitude: {
    type: STRING(13)
  }
}, {
  freezeTableName: true,
  tableName: 'stations',
  timestamps: true
})
