module.exports = {
  down: queryInterface => queryInterface.dropTable('stations'),
  up: (queryInterface, DataTypes) => queryInterface.createTable('stations', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      primaryKey: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
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
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  })
}
