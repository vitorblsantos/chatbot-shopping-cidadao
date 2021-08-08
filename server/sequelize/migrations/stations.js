module.exports = {
  down: queryInterface => queryInterface.dropTable('stations'),
  up: (queryInterface, Sequelize) => queryInterface.createTable('stations', {
    _id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    createdAt: {
      type: Sequelize.DATE
    },
    description: {
      type: Sequelize.STRING(100)
    },
    latitude: {
      type: Sequelize.STRING(13)
    },
    longitude: {
      type: Sequelize.STRING(13)
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  })
}
