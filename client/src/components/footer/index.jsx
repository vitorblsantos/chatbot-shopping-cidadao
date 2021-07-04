import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setChatActive, setChatLoaderActive, setMessages, setOptions } from '../../store/ducks/chatbot'
import { setToastActive } from '../../store/ducks/toast'

import { Background, Button, Container, Input, Send } from './style'

const Footer = () => {
  const dispatch = useDispatch()
  const [inputMessage, setInputMessage] = useState('')

  const { chatbot } = useSelector(state => state)

  const handleActions = actions => {
    if (actions.getEmail === 'true') console.log('getEmail')
  }

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
    dispatch(setChatLoaderActive(true))
    dispatch(setOptions([]))
    dispatch(setMessages('user', inputMessage))
    dispatch(setInputMessage(''))
  }

  useEffect(() => {
    handleActions(chatbot.actions)
  }, [chatbot.actions])

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
