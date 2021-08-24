import { User } from '../models/'

const create = async (req, res) => {
  const { body } = req
  try {
    await User.create({ ...body })
    return res.status(201).send('Usuario criado')
  } catch (e) {
    return res.status(500).send(e)
  }
}

export default {
  create
}
