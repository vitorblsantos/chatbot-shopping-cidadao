import { Api } from '../helpers'

const create = async ({ date, session, station, user }) => {
  const params = {
    date,
    session,
    station,
    user
  }

  const { data } = await Api.post('/schedules', { ...params })
  return data
}

const getByIdentifier = async identifier => {
  const { data } = await Api.get(`/schedules/${identifier}`)
  return data
}

export default {
  create,
  getByIdentifier
}
