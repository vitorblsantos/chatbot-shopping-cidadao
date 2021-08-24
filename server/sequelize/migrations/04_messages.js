module.exports = {
  down: queryInterface => queryInterface.dropTable('messages'),
  up: (queryInterface, DataTypes) => queryInterface.createTable('messages', {
    _id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      primaryKey: true
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(150)
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    session: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'sessions',
        key: '_id'
      }
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  })
}
