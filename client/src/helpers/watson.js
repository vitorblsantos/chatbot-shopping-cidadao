'use strict'

import { Api } from '../helpers'

const sendMessage = async ({ context, message, sessionId }) => {
  const params = {
    context,
    message,
    sessionId
  }
  const { data } = await Api.post('/watson/message', { ...params })
  return data
}

export default {
  sendMessage
}
