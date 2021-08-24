import { Api } from './'

const save = async ({ email, name }) => {
  const params = {
    email,
    name
  }
  await Api.post('/data/users', params)
}

export default {
  save
}
