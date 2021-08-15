const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Schedules extends Model {
    static associate (models) {
      this.hasOne(models.User, { foreignKey: '_id', as: 'user' })
      this.hasOne(models.Session, { foreignKey: '_id', as: 'session' })
      this.hasOne(models.Station, { foreignKey: '_id', as: 'station' })
    }
  }

  Schedules.init({
    _id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      primaryKey: true
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    freezeTableName: true,
    sequelize,
    tableName: 'schedules',
    timestamps: true
  })

  return Schedules
}
