'use strict'

import AssistantV2 from 'ibm-watson/assistant/v2'
import { IamAuthenticator } from 'ibm-watson/auth'

const assistant = new AssistantV2({
  version: '2020-09-24',
  authenticator: new IamAuthenticator({
    apikey: '-1Mud9j8hGCu1FmUMypqRJrJqkiCXI3FKof-OzEVTJ49'
  }),
  serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com/'
})

const createSession = async () => {
  const { result } = await assistant.createSession({
    assistantId: 'c7f39109-43ca-4601-a84f-bb5a4a2a4497'
  })
  return result.session_id
}

<<<<<<< HEAD
const sendMessage = async (message, sessionId) => {
  const { result } = await assistant.message({
    assistantId: 'c7f39109-43ca-4601-a84f-bb5a4a2a4497',
    sessionId,
    input: {
      message_type: 'text',
      text: message
    }
  })
  result.userId = result.user_id
  return result
}

export default {
  createSession,
  sendMessage
=======
export default {
  createSession
>>>>>>> master
}
