import React, { useEffect, useState } from 'react'
import { Background, Button, Container, Input, Send } from './style'

const INITIAL_USER_MESSAGE = { sender: 'user', content: '' }

const Footer = () => {
  const [userMessage, setUserMessage] = useState(INITIAL_USER_MESSAGE)

  const handleKey = ({ keyCode }) => keyCode && keyCode === 13 && handleMessage()
  const handleInput = ({ target }) => setUserMessage({ ...userMessage, content: target.value })
  const handleMessage = () => setUserMessage(INITIAL_USER_MESSAGE)

  useEffect(() => {
    // console.log(userMessage)
  }, [userMessage])

  return (
    <Container>
      <Background>
        <Input onChange={(e) => handleInput(e)} onKeyDown={e => handleKey(e)} placeholder='Digite sua mensagem...' value={userMessage.content} />
        <Button>
          <Send onClick={handleMessage} />
        </Button>
      </Background>
    </Container>
  )
}

export default Footer
