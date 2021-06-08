'use strict'

import { Watson } from '../services'

const createSession = async (_, res) => {
  const session = await Watson.createSession()
  return res.status(200).send(session)
}

export default {
  createSession
}
