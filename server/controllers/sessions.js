import { Session } from '../models/'

const create = async (req, res) => {
  const { body } = req
  try {
    return res.status(201).send(await Session.create({ ...body }))
  } catch (e) {
    return res.status(500).send(e)
  }
}

export default {
  create
}
