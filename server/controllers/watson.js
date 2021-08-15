'use strict'

import { Watson } from '../services'

const { Session } = require('../models/')

const createSession = async (_, res) => {
  const watsonId = await Watson.createSession()
  const data = await Session.create({ watsonId })
  return res.status(200).send(data.dataValues._id)
}

const sendMessage = async (req, res) => {
  const { context, message, sessionId } = req.body
  const { dataValues: storedSession } = await Session.findOne({ where: { _id: sessionId } })

  const response = await Watson.sendMessage(context, message, storedSession.watsonId)
  res.status(200).send(response)
}

export default {
  createSession,
  sendMessage
}
