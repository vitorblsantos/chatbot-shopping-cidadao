module.exports = {
  down: queryInterface => queryInterface.dropTable('messages'),
  up: (queryInterface, Sequelize) => queryInterface.createTable('messages', {
    _id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    content: {
      allowNull: false,
      type: Sequelize.STRING(150)
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    session: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    user: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: '_id'
      }
    }
  })
}
