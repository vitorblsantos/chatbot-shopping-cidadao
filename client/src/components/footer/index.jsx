import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setMessage } from '../../store/ducks/chatbot'
import { Container, Input, Button, Send } from './style'

const INITIAL_USER_MESSAGE = { sender: 'user', content: '' }

const Footer = () => {
  const dispatch = useDispatch()
  const [userMessage, setUserMessage] = useState(INITIAL_USER_MESSAGE)

  const handleKey = ({ keyCode }) => keyCode && keyCode === 13 && handleMessage()
  const handleInput = ({ target }) => setUserMessage({ ...userMessage, content: target.value })
  const handleMessage = () => dispatch(setMessage(userMessage)) && setUserMessage(INITIAL_USER_MESSAGE)

  useEffect(() => {
    // console.log(userMessage)
  }, [userMessage])

  return (
    <Container>
      <Input onChange={(e) => handleInput(e)} onKeyDown={e => handleKey(e)} placeholder='Digite sua mensagem...' value={userMessage.content} />
      <Button>
        <Send onClick={handleMessage} />
      </Button>
    </Container>
  )
}

export default Footer
