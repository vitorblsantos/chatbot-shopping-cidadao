import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Sleep } from '../../helpers'

import { addUserInteraction } from '../../store/ducks/user'
import { setChatActive } from '../../store/ducks/chatbot'
import { setToastActive } from '../../store/ducks/toast'

import { Bot, Button, Container, Span, Status } from './style'

const Header = () => {
  const dispatch = useDispatch()

  const chatbot = useSelector(({ chatbot }) => chatbot)
  const toast = useSelector(({ toast }) => toast)

  const handleChat = async () => {
    dispatch(addUserInteraction('Header', 'handleChat'))
    dispatch(setChatActive(!chatbot.active))
    await Sleep(200)
    dispatch(setToastActive(!toast.active))
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
