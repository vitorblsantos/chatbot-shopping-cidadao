import { json } from 'body-parser'
import { join } from 'path'

import compression from 'compression'
import cors from 'cors'
import express from 'express'

import { Watson } from './routes'

const App = express()

App.disable('x-powered-by')

App.get('/', function (_, res) {
  res.status(200).sendFile(join(__dirname, '..', '..', '/build/client/index.html'))
})

App.use(cors())
App.use(compression())
App.use(express.static('./build/client/'))
App.use(json())

App.use('/watson', Watson)

export default App
