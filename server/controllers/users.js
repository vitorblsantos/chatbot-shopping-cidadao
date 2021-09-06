import { User } from '../models/'

const create = async (req, res) => {
  const { body } = req
  try {
    const user = await User.create({ ...body })
    return res.status(201).send(user)
  } catch (e) {
    return res.status(500).send(e)
  }
}

export default {
  create
}
