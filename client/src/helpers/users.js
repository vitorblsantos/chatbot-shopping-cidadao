import { Api } from './'

const create = async ({ email, name }) => {
  const params = {
    email,
    name
  }
  const { data } = await Api.post('/data/users', params)
  return data
}

const get = async ({ email }) => {
  const { data } = await Api.get(`/data/users/${email}`)
  return data
}

export default {
  create,
  get
}
