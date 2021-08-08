import 'dotenv/config'
import Sequelize from 'sequelize'

const { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env

export default new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT
})
