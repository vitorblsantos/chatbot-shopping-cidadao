'use strict'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Sleep } from '../../helpers'

import { setActive } from '../../store/ducks/chatbot'

import { Button, Container, Interaction, Logo } from './style'

const Toast = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState({ active: false, content: '' })
  const [chatVisible, setChatVisible] = useState(false)

  const { config } = useSelector(({ chatbot }) => chatbot)

  const handleChat = () => dispatch(setActive(!config.active))

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

    Sleep(4000).then(() => setMessage({ ...message, active: false }))
  })

  useEffect(() => {
    setChatVisible(config.active)
    setMessage({ ...message, active: false })
  }, [config])

  useEffect(() => {
    handleMessage()
  }, [])

  return (
    <Container {...{ chatVisible }}>
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
