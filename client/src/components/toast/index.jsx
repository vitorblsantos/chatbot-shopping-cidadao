'use strict'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setChatActive } from '../../store/ducks/chatbot'
import { handleMessage, setToastActive } from '../../store/ducks/toast'
import { addUserInteraction, addUserSessionId } from '../../store/ducks/user'

import { Button, Container, Logo, Message, Position } from './style'

const Toast = () => {
  const dispatch = useDispatch()
  const [toastMessage, setToastMessage] = useState('')

  const chatbot = useSelector(({ chatbot }) => chatbot)
  const toast = useSelector(({ toast }) => toast)
  const user = useSelector(({ user }) => user)

  const handleChat = () => {
    dispatch(setChatActive(!chatbot.active))
    dispatch(setToastActive(!toast.active))
    handleSessionId(!chatbot.active)
    dispatch(addUserInteraction())
  }

  const handleToastMessage = async () => {
    if (user.interactions > 0) return false
    const messages = [
      { tag: <span>Agendamento <br />de Biometria?</span> },
      { tag: <span>Agendamento <br />de CPF?</span> },
      { tag: <span>Agendamento <br />de RG?</span> },
      { tag: <span>Agendamento <br />de Titulo Eleitor?</span> },
      { tag: <span>Precisa consultar <br />um agendamento?</span> }
    ]

    const random = Math.floor(Math.random() * messages.length)
    setToastMessage(messages[random])
    dispatch(handleMessage())
  }

  const handleSessionId = chatActive => {
    if (!chatActive) return false
    dispatch(addUserSessionId())
  }

  useEffect(() => {
    handleToastMessage()
  }, [user.interactions])

  return (
    <Position {...toast}>
      <Container>
        <Message {...toast.message}>
          {toastMessage.tag}
        </Message>
        <Button onClick={handleChat}>
          <Logo />
        </Button>
      </Container>
    </Position>
  )
}

export default Toast
