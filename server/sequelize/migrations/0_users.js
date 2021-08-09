module.exports = {
  down: queryInterface => queryInterface.dropTable('users'),
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    _id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    document: {
      allowNull: false,
      type: Sequelize.STRING(11)
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING(80)
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })
}
