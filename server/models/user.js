import { INTEGER, STRING } from 'sequelize'

import database from '../config/database'

export default database.define('user', {
  _id: {
    autoIncrement: true,
    type: INTEGER,
    primaryKey: true
  },
  email: {
    type: STRING
  },
  name: {
    type: STRING
  },
  session: {
    type: STRING
  }
})
