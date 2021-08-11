const { DATE, INTEGER } = require('sequelize')

const { Users, Stations } = require('./')
const Database = require('../sequelize/')

const Schedules = Database.define('schedules', {
  _id: {
    autoIncrement: true,
    type: INTEGER,
    primaryKey: true
  },
  createdAt: {
    allowNull: false,
    type: DATE
  },
  date: {
    allowNull: false,
    type: DATE
  },
  session: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'sessions',
      key: '_id'
    }
  },
  station: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'stations',
      key: '_id'
    }
  },
  updatedAt: {
    allowNull: false,
    type: DATE
  }
}, {
  freezeTableName: true,
  tableName: 'schedules',
  timestamps: true
})

Schedules.hasOne(Users, {
  onDelete: 'cascade',
  onUpdate: 'cascade'
})

Schedules.hasOne(Stations, {
  onDelete: 'cascade',
  onUpdate: 'cascade'
})

module.exports = Schedules
