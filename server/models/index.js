'use strict'

const fs = require('fs')
const path = require('path')

const env = process.env.NODE_ENV || 'development'

const config = require(path.join(__dirname, '/../sequelize/config.js'))[env]
const Sequelize = require('sequelize')

const basename = path.basename(__filename)
const models = []

const sequelize = new Sequelize(config.database, config.username, config.password, config)

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .map(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    models[model.name] = model
    return file
  })

models
  .map((model) => model.init(sequelize))
  .map((model) => {
    if (model.associate) model.associate(this.connection.models)
    return model
  })

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models
