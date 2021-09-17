module.exports = {
  down: queryInterface => queryInterface.dropTable('messages'),
  up: (queryInterface, DataTypes) => queryInterface.createTable('messages', {
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    sender: {
      allowNull: false,
      type: DataTypes.STRING(5)
    },
    session: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'sessions',
        key: 'id'
      }
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  })
}
