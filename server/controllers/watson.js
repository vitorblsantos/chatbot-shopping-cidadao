'use strict'

import { Watson } from '../services'

const createSession = async (_, res) => {
  const session = await Watson.createSession()
  return res.status(200).send(session)
}

const sendMessage = async (req, res) => {
  const { message, sessionId } = req.body
  const response = await Watson.sendMessage(message, sessionId)
  res.status(200).send(response)
}

export default {
  createSession,
  sendMessage
}
