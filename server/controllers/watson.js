'use strict'

import { Watson } from '../services'

import { Session } from '../models/'

const createSession = async (_, res) => {
  const watsonId = await Watson.createSession()
  return res.status(200).send(await Session.create({ watsonId }))
}

const sendMessage = async (req, res) => {
  const { context, message, sessionId } = req.body
  const response = await Watson.sendMessage({ context, message, sessionId })
  res.status(200).send(response)
}

export default {
  createSession,
  sendMessage
}
