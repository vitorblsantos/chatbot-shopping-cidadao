import { Session } from '../models/'

const create = async (req, res) => {
  const { body } = req
  try {
    await Session.create({ ...body })
    return res.status(200).send('Sessao criada')
  } catch (e) {
    return res.status(500).send(e)
  }
}

export default {
  create
}
