import { Message, Session } from '../models/'

const create = async (req, res) => {
  const { content, sessionId } = req.body

  const draftContent = JSON.stringify(content)
  const { dataValues } = await Session.findOne({ where: { watsonId: sessionId } })

  try {
    await Message.create({
      content: draftContent,
      session: dataValues.id
    })

    return res.status(200).send('Message created')
  } catch (err) {
    return res.status(500).send(`Error: ${err}`)
  }
}

export default {
  create
}
