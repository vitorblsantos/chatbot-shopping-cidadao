import { Watson } from '../services'

import { Message, Session } from '../models/'
import { Op } from 'sequelize'

const createSession = async (_, res) => {
  const watsonId = await Watson.createSession()
  return res.status(200).send(await Session.create({ watsonId }))
}

const sendMessage = async (req, res) => {
  try {
    const { context, message, sessionId } = req.body
    const { dataValues } = await Session.findOne({ where: { watsonId: { [Op.eq]: sessionId } } })
    await Message.create({ content: message, context: JSON.stringify(context), sender: 'user', session: dataValues?.id })
    const watsonResponse = await Watson.sendMessage({ context, message, sessionId })
    await Message.create({ content: JSON.stringify(watsonResponse.output), context: JSON.stringify(watsonResponse.context), sender: 'bot', session: dataValues?.id })
    res.status(200).send(watsonResponse)
  } catch (err) {
    res.status(500).send(err)
  }
}

export default {
  createSession,
  sendMessage
}
