module.exports = {
  down: queryInterface => queryInterface.dropTable('schedules'),
  up: (queryInterface, DataTypes) => queryInterface.createTable('schedules', {
    _id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      primaryKey: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },

    date: {
      allowNull: false,
      type: DataTypes.DATE
    },

    session: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      references: {
        model: 'sessions',
        key: '_id'
      }
    },
    station: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      references: {
        model: 'stations',
        key: '_id'
      }
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    user: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: '_id'
      }
    }
  })
}
