require('dotenv/config')
const Sequelize = require('sequelize')

const { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT
})
