'use strict'

import { Api } from '../helpers'

const sendMessage = async (message, sessionId) => {
  const params = {
    message,
    sessionId
  }
  const { data } = await Api.post('/watson/message', { ...params })
  return data
}

export default {
  sendMessage
}
