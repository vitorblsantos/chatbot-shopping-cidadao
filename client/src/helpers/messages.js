import { Api } from '../helpers'

const save = async ({ content, sessionId }) => {
  const params = {
    content,
    sessionId
  }
  const { data } = await Api.post('/data/message', { ...params })
  return data
}

export default {
  save
}
