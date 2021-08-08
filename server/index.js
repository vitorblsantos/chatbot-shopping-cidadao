import 'dotenv/config'

import { db } from './sequelize'

import Server from './server'

const { API_PORT } = process.env

db.authenticate().then(() => {
  Server.listen(API_PORT, () => console.log(`Server running on port: ${API_PORT}`))
}).catch(err => {
  throw new Error(err)
})
