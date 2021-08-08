require('dotenv/config')

const { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env

module.exports = {
  development: {
    database: DB_NAME,
    dialect: DB_DIALECT,
    host: DB_HOST,
    password: DB_PASSWORD,
    username: DB_USER
  },
  production: {
    database: DB_NAME,
    dialect: DB_DIALECT,
    host: DB_HOST,
    password: DB_PASSWORD,
    username: DB_USER
  }
}
