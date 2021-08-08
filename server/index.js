import 'dotenv/config'

import database from './sequelize'

import Server from './server'

const { PORT } = process.env

database.authenticate().then(() => {
  return Server.listen(PORT || 5000, () => console.log(`Server running on port: ${PORT}`))
}).catch(err => {
  throw new Error(err)
})
