const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (_) {}
  }

  User.init({
    _id: {
      autoIncrement: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100)
    },
    name: {
      type: DataTypes.STRING(100)
    }
  }, {
    freezeTableName: true,
    sequelize,
    tableName: 'users',
    timestamps: true
  })

  return User
}
