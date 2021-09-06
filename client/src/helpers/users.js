import { Api } from './'

const create = async ({ email, name }) => {
  const params = {
    email,
    name
  }
  const { data } = await Api.post('/data/users', params)
  return data
}

export default {
  create
}
