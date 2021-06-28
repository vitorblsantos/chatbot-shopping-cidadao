import { json } from 'body-parser'
import { resolve } from 'path'

import compression from 'compression'
import cors from 'cors'
import express from 'express'

import { Watson, Webhooks } from './routes'

const App = express()

App.disable('x-powered-by')

App.get('/', function (_, res) {
  res.status(200).sendFile(resolve(__dirname, '../index.html'))
})

App.use(cors())
App.use(compression())
App.use(express.static('./build/'))
App.use(json())

App.use('/watson', Watson)
App.use('/webhooks', Webhooks)

export default App
