module.exports = {
  down: queryInterface => queryInterface.dropTable('sessions'),
  up: (queryInterface, Sequelize) => queryInterface.createTable('sessions', {
    _id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    watsonId: {
      allowNull: false,
      type: Sequelize.STRING(40)
    },
    user: {
      allowNull: false,
      foreignKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: '_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })
}
