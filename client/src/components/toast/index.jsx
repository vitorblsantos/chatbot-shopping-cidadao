'use strict'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setChatActive } from '../../store/ducks/chatbot'
import { setToastActive, setToastMessageActive } from '../../store/ducks/toast'

import { Button, Container, Logo, Message, Position } from './style'

import { Sleep } from '../../helpers'

const Toast = () => {
  const dispatch = useDispatch()
  const [toastMessage, setToastMessage] = useState('')

  const chatbot = useSelector(({ chatbot }) => chatbot)
  const toast = useSelector(({ toast }) => toast)

  const handleChat = () => {
    dispatch(setChatActive(!chatbot.active))
    dispatch(setToastActive(!toast.active))
    dispatch(setToastMessageActive(false))
  }

  const handleToastMessage = async chatActive => {
    if (chatActive) return false
    const messages = [
      { tag: <span>Agendamento <br />de Biometria?</span> },
      { tag: <span>Agendamento <br />de CPF?</span> },
      { tag: <span>Agendamento <br />de RG?</span> },
      { tag: <span>Agendamento <br />de Titulo Eleitor?</span> },
      { tag: <span>Precisa consultar <br />um agendamento?</span> }
    ]

    const random = Math.floor(Math.random() * messages.length)

    setToastMessage(messages[random])

    await Sleep(8000)
    dispatch(setToastMessageActive(true))
    await Sleep(8000)
    dispatch(setToastMessageActive(false))
  }

  useEffect(() => {
    handleToastMessage(chatbot.active)
  }, [chatbot])

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
