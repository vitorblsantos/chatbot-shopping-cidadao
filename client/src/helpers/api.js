'use strict'

import 'dotenv/config'
import { create } from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? `${window.location.href}api` : 'http://localhost:5000/api'

const Api = create({
  baseURL
})

export default Api
