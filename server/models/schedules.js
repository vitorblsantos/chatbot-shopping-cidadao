const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate (_) {}
  }

  Schedule.init({
    _id: {
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
      referencesKey: '_id',
      references: 'sessions',
      type: DataTypes.UUID
    },
    station: {
      referencesKey: '_id',
      references: 'stations',
      type: DataTypes.UUID
    },
    user: {
      referencesKey: '_id',
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
