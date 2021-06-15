import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setChatActive, setMessages } from '../../store/ducks/chatbot'
import { setToastActive } from '../../store/ducks/toast'

import { Background, Button, Container, Input, Send } from './style'

const Footer = () => {
  const dispatch = useDispatch()
  const [inputMessage, setInputMessage] = useState('')

  const handleKey = async ({ keyCode }) => {
    // 13 enter - 27 escape
    if (keyCode === 13) return handleMessage()
    if (keyCode === 27) {
      dispatch(setChatActive(false))
      dispatch(setToastActive(true))
    }
  }
  const handleInput = ({ target }) => setInputMessage(target.value)
  const handleMessage = () => {
    dispatch(setMessages('user', inputMessage))
    setInputMessage('')
  }

  return (
    <Container>
      <Background>
        <Input onChange={(e) => handleInput(e)} onKeyDown={e => handleKey(e)} placeholder='Digite sua mensagem...' value={inputMessage} />
        <Button>
          <Send onClick={handleMessage} />
        </Button>
      </Background>
    </Container>
  )
}

export default Footer
