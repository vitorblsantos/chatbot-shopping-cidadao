const { DATE, INTEGER, STRING } = require('sequelize')

const { Users } = require('./')
const Database = require('../sequelize/')

const Sessions = Database.define('schedules', {
  _id: {
    autoIncrement: true,
    type: INTEGER,
    primaryKey: true
  },
  createdAt: {
    allowNull: false,
    type: DATE
  },
  session: {
    allowNull: false,
    foreignKey: true,
    type: INTEGER,
    references: {
      model: 'sessions',
      key: '_id'
    }
  },
  updatedAt: {
    allowNull: false,
    type: DATE
  },
  watsonId: {
    allowNull: false,
    type: STRING(40)
  }
}, {
  freezeTableName: true,
  tableName: 'schedules',
  timestamps: true
})

Sessions.hasOne(Users, {
  onDelete: 'cascade',
  onUpdate: 'cascade'
})

module.exports = Sessions
