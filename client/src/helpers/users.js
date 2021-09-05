import { Api } from './'

const create = async ({ email, name }) => {
  const params = {
    email,
    name
  }
  await Api.post('/data/users', params)
}

export default {
  create
}
