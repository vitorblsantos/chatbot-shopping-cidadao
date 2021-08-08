module.exports = {
  down: queryInterface => queryInterface.dropTable('messages'),
  up: (queryInterface, Sequelize) => queryInterface.createTable('messages', {
    _id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    content: {
      type: Sequelize.STRING(150)
    },
    createdAt: {
      type: Sequelize.DATE
    },
    session: {
      type: Sequelize.INTEGER
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    user: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: '_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  })
}
