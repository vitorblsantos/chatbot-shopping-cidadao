module.exports = {
  down: queryInterface => queryInterface.dropTable('stations'),
  up: (queryInterface, Sequelize) => queryInterface.createTable('stations', {
    _id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    latitude: {
      allowNull: false,
      type: Sequelize.STRING(12)
    },
    longitude: {
      allowNull: false,
      type: Sequelize.STRING(13)
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })
}
