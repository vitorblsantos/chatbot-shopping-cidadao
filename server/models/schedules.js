const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate (_) {}
  }

  Schedule.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      primaryKey: true
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    session: {
      referencesKey: 'id',
      references: 'sessions',
      type: DataTypes.UUID
    },
    station: {
      referencesKey: 'id',
      references: 'stations',
      type: DataTypes.UUID
    },
    status: {
      defaultValue: 'waiting',
      type: DataTypes.ENUM({
        values: ['active', 'canceled', 'waiting']
      })
    },
    user: {
      referencesKey: 'id',
      references: 'users',
      type: DataTypes.UUID
    }
  }, {
    freezeTableName: true,
    sequelize,
    tableName: 'schedules',
    timestamps: true
  })

  return Schedule
}
