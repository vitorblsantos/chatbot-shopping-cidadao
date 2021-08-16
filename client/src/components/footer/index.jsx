import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setChatActive, setChatLoaderActive, setMessages, setOptions } from '../../store/ducks/chatbot'
import { setToastActive } from '../../store/ducks/toast'
import { addUserInteraction, setUserEmail } from '../../store/ducks/user'

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
    const isEmail = inputMessage.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/)
    const draftContext = {}

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
