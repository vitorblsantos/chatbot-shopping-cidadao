module.exports = {
  down: queryInterface => queryInterface.dropTable('user'),
  up: (queryInterface, Sequelize) => queryInterface.createTable('user', {
    _id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    createdAt: {
      type: Sequelize.DATE
    },
    document: {
      type: Sequelize.STRING(11)
    },
    email: {
      type: Sequelize.STRING(100)
    },
    name: {
      type: Sequelize.STRING(80)
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  })
}
