import { Station } from '../models/'

const get = async (_, res) => {
  try {
    const stations = await Station.findAll({})
    return res.status(200).send(stations)
  } catch (e) {
    return res.status(500).send(e)
  }
}

export default {
  get
}
