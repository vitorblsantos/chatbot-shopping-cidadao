module.exports = {
  down: queryInterface => queryInterface.dropTable('schedules'),
  up: (queryInterface, Sequelize) => queryInterface.createTable('schedules', {
    _id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
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
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })
}
