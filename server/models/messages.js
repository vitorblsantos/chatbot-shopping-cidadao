const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    static associate (models) {
      this.hasOne(models.Session, { foreignKey: '_id', as: 'session' })
    }
  }

  Messages.init({
    _id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      primaryKey: true
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(150)
    }
  }, {
    freezeTableName: true,
    sequelize,
    tableName: 'messages',
    timestamps: true
  })

  return Messages
}
