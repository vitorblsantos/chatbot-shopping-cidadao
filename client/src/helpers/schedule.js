import { Api } from '../helpers'

const create = async ({ date, session, station, user }) => {
  const params = {
    date,
    session,
    station,
    user
  }

  const { data } = await Api.post('/data/schedules', { ...params })
  return data
}

export default {
  create
}