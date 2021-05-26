'use strict'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Sleep } from '../../helpers'
import { setChatActive } from '../../store/ducks/chatbot'
import { setToastActive } from '../../store/ducks/toast'

import { Button, Container, Interaction, Logo } from './style'

const Toast = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState({ active: false, content: '' })
  const [chatVisible, setChatVisible] = useState(false)

  const chatbot = useSelector(({ chatbot }) => chatbot)
  const toast = useSelector(({ toast }) => toast)

  const handleChat = () => {
    dispatch(setChatActive(!chatbot.active))
    dispatch(setToastActive(!toast.active))
  }

  const handleMessage = () => Sleep(2000).then(() => {
    const messages = [
      'Agendar Biometria?',
      'Agendamento CPF?',
      'Agendamento RG?',
      'Agendar Titulo Eleitor?',
      'Precisa de ajuda?'
    ]

    const random = Math.floor(Math.random() * messages.length)

    setMessage({ active: true, content: messages[random] })

    Sleep(8000).then(() => setMessage({ ...message, active: false }))
  })

  useEffect(() => {
    handleMessage()
  }, [])

  return (
    <Container {...toast}>
      <Button onClick={handleChat}>
        <Logo />
      </Button>
      <Interaction {...{ chatVisible, message }}>
        <span>{message.content}</span>
      </Interaction>
    </Container>
  )
}

export default Toast
