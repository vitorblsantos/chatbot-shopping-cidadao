import 'dotenv/config'

import { db } from './sequelize'

import Server from './server'

const { API_PORT } = process.env

db.authenticate().then(() => {
  return Server.listen(API_PORT || 5000, () => console.log(`Server running on port: ${API_PORT}`))
}).catch(err => {
  throw new Error(err)
})
