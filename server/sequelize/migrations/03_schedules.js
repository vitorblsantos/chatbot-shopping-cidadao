module.exports = {
  down: queryInterface => queryInterface.dropTable('schedules'),
  up: (queryInterface, DataTypes) => queryInterface.createTable('schedules', {
    id: {
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
    service: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    session: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      references: {
        model: 'sessions',
        key: 'id'
      }
    },
    station: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      references: {
        model: 'stations',
        key: 'id'
      }
    },
    status: {
      allowNull: false,
      defaultValue: 'waiting',
      type: DataTypes.ENUM({
        values: ['active', 'canceled', 'waiting']
      })
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
        key: 'id'
      }
    }
  })
}
