module.exports = {
  down: queryInterface => queryInterface.dropTable('user'),
  up: (queryInterface, Sequelize) => queryInterface.createTable('user', {
    _id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    session: {
      type: Sequelize.STRING
    }
  })
}
