'use strict'

import { Watson } from '../services'

import { Session } from '../models/'

const createSession = async (_, res) => {
  const watsonId = await Watson.createSession()
  await Session.create({ watsonId })
  return res.status(200).send(watsonId)
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
