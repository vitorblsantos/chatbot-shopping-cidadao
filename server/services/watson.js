import 'dotenv/config'
import AssistantV2 from 'ibm-watson/assistant/v2'
import { IamAuthenticator } from 'ibm-watson/auth'

const { WATSON_API_KEY, WATSON_ASSISTANT_ID, WATSON_SERVICE_URL, WATSON_SERVICE_VERSION } = process.env

const assistant = new AssistantV2({
  version: WATSON_SERVICE_VERSION,
  authenticator: new IamAuthenticator({
    apikey: WATSON_API_KEY
  }),
  serviceUrl: WATSON_SERVICE_URL
})

const createSession = async () => {
  const { result } = await assistant.createSession({
    assistantId: WATSON_ASSISTANT_ID
  })
  return result.session_id
}

const sendMessage = async ({ context, message, sessionId }) => {
  const { result } = await assistant.message({
    assistantId: WATSON_ASSISTANT_ID,
    sessionId,
    input: {
      message_type: 'text',
      text: message,
      options: {
        return_context: true
      }
    },
    context
  })
  return result
}

export default {
  createSession,
  sendMessage
}
