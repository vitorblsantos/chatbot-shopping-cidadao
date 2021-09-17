const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate (_) {}
  }

  Message.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      primaryKey: true
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    context: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    sender: {
      allowNull: false,
      type: DataTypes.STRING(5)
    },
    session: {
      referencesKey: 'id',
      references: 'sessions',
      type: DataTypes.UUID
    }
  }, {
    freezeTableName: true,
    sequelize,
    tableName: 'messages',
    timestamps: true
  })

  return Message
}
