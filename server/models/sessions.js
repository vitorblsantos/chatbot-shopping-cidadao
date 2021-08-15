const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate (models) {}
  }

  Session.init({
    _id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      primaryKey: true
    },
    watsonId: {
      allowNull: false,
      type: DataTypes.STRING(40)
    }
  }, {
    freezeTableName: true,
    sequelize,
    tableName: 'sessions',
    timestamps: true
  })

  return Session
}
