require('dotenv/config')

const database = require('./sequelize/')

const Server = require('./server.js')

const { PORT } = process.env

database.authenticate().then(() => {
  return Server.listen(PORT || 5000, () => console.log(`Server running on port: ${PORT || 5000}`))
}).catch(err => {
  throw new Error(err)
})
