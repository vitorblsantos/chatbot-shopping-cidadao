import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setChatActive, setChatLoaderActive, setMessages, setOptions } from '../../store/ducks/chatbot'
import { setToastActive } from '../../store/ducks/toast'
import { addUserInteraction, setUserEmail, setUserName } from '../../store/ducks/user'

import { Background, Button, Container, Input, Send } from './style'

const Footer = () => {
  const dispatch = useDispatch()
  const [inputMessage, setInputMessage] = useState('')
  const [inputValid, setInputValid] = useState(true)

  const { chatbot } = useSelector(state => state)

  const handleInput = ({ target }) => setInputMessage(target.value)

  const handleKey = async ({ keyCode }) => {
    // 13 enter - 27 escape
    if (keyCode === 13) return handleMessage()
    if (keyCode === 27) {
      dispatch(setChatActive(false))
      dispatch(setToastActive(true))
    }
  }

  const handleMessage = () => {
    const draftContext = {}
    const isEmail = inputMessage.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/)
    const lastInteraction = chatbot.messages[chatbot.messages.length - 1]

    if (lastInteraction) {
      draftContext.skills = { ...lastInteraction.context.skills }
      draftContext.skills['main skill'].user_defined.firstInteraction = false
    }

    if (chatbot.actions) {
      if (chatbot.actions.getEmail === 'true') {
        draftContext.skills = {
          'main skill': {
            user_defined: {
              email: isEmail ? 'true' : 'false',
              getEmail: 'false'
            }
          }
        }
        if (!isEmail) {
          setInputValid(false)
        } else {
          dispatch(setUserEmail(inputMessage))
        }
      }

      if (chatbot.actions.getName === 'true') {
        draftContext.skills = {
          'main skill': {
            user_defined: {
              name: inputMessage.length ? 'true' : 'false',
              getName: 'false'
            }
          }
        }
        if (!inputMessage) {
          setInputValid(false)
        } else {
          dispatch(setUserName(inputMessage))
        }
      }
    }

    if (inputValid) {
      dispatch(setChatLoaderActive(true))
      dispatch(setOptions([]))
      dispatch(addUserInteraction('footer', 'handleMessage', { message: inputMessage }))
      dispatch(setMessages({ content: inputMessage, context: draftContext, sender: 'user' }))
      setInputMessage('')
    }
  }

  return (
    <Container>
      <Background>
        <Input onChange={(e) => handleInput(e)} onKeyDown={e => handleKey(e)} placeholder={chatbot.input.placeholder || 'Digite sua mensagem...'} value={inputMessage} />
        <Button>
          <Send onClick={handleMessage} />
        </Button>
      </Background>
    </Container>
  )
}

export default Footer
