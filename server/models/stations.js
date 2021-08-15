const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    static associate (models) {}
  }

  Station.init({
    _id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      primaryKey: true
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    latitude: {
      allowNull: false,
      type: DataTypes.STRING(12)
    },
    longitude: {
      allowNull: false,
      type: DataTypes.STRING(13)
    }
  }, {
    freezeTableName: true,
    sequelize,
    tableName: 'stations',
    timestamps: true
  })

  return Station
}
