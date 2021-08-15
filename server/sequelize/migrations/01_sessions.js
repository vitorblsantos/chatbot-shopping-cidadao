module.exports = {
  down: queryInterface => queryInterface.dropTable('sessions'),
  up: (queryInterface, DataTypes) => queryInterface.createTable('sessions', {
    _id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      primaryKey: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    watsonId: {
      allowNull: false,
      type: DataTypes.STRING(40)
    }
  })
}
