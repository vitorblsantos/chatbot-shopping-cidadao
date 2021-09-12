import { json } from 'body-parser'
import { resolve } from 'path'

import compression from 'compression'
import cors from 'cors'
import express from 'express'

import { Data, Email, Watson, Webhooks } from './routes'

const Server = express()

Server.disable('x-powered-by')

Server.get('/', function (_, res) {
  res.status(200).sendFile(resolve(__dirname, '../index.html'))
})

Server.use(cors())
Server.use(compression())
Server.use(express.static('./build/'))
Server.use(json())

Server.use('/email', Email)
Server.use('/data', Data)
Server.use('/watson', Watson)
Server.use('/webhooks', Webhooks)

module.exports = Server
