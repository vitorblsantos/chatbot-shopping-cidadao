import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Sleep } from '../../helpers'

import { setUserInteraction } from '../../store/ducks/user'
import { setChat } from '../../store/ducks/chatbot'
import { setToast } from '../../store/ducks/toast'

import { Bot, Button, Container, Span, Status } from './style'

const Header = () => {
  const dispatch = useDispatch()

  const chatbot = useSelector(({ chatbot }) => chatbot)
  const toast = useSelector(({ toast }) => toast)

  const handleChat = async () => {
    dispatch(setUserInteraction('Header', 'handleChat'))
    dispatch(setChat(!chatbot.active))
    await Sleep(200)
    dispatch(setToast(!toast.active))
  }

  return (
    <>
      <Container>
        <Bot />
        <Span>Chatbot - UAI</Span>
        <Button onClick={handleChat}> + </Button>
      </Container>
      <Status />
    </>
  )
}

export default Header
