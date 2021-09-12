module.exports = {
  down: queryInterface => queryInterface.dropTable('users'),
  up: (queryInterface, DataTypes) => queryInterface.createTable('users', {
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
    email: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(80)
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  })
}
