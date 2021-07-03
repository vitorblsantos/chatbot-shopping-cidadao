import 'dotenv/config'
import mongoose from 'mongoose'

import Server from './server'

const { MONGO_DB, MONGO_URL, MONGO_PARAMS, API_PORT } = process.env

const urlString = `${MONGO_URL}${MONGO_DB}${MONGO_PARAMS}`

mongoose.connect(urlString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
})

mongoose.connection.on('connected', () => Server.listen(API_PORT, () => console.log(`Server running on port: ${API_PORT}`)))
mongoose.connection.on('error', console.error.bind(console, 'Mongoose connection error:'))
