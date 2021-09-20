import { Api } from '../helpers'

const active = async (params) => {
  const { data } = await Api.post('/schedules/active', { ...params })
  return data
}

const create = async ({ date, service, session, station, user }) => {
  const params = {
    date,
    service,
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

const inactive = async (params) => {
  const { data } = await Api.post('/schedules/inactive', { ...params })
  return data
}

export default {
  active,
  create,
  getByIdentifier,
  inactive
}
