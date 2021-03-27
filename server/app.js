import { json } from 'body-parser'

import compression from 'compression'
import cors from 'cors'
import express from 'express'

import routes from './routes'

const App = express()

App.disable('x-powered-by')
App.use(cors())
App.use(compression())
App.use(json())
App.use(express.static('./build/client/'))
App.use(routes)

export default App
