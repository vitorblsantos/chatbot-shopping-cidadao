module.exports = {
  down: queryInterface => queryInterface.dropTable('schedules'),
  up: (queryInterface, Sequelize) => queryInterface.createTable('schedules', {
    _id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    date: {
      allowNull: false,
      type: Sequelize.DATE
    },
    session: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'sessions',
        key: '_id'
      }
    },
    station: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'stations',
        key: '_id'
      }
    },
    user: {
      allowNull: false,
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
