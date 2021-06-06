'use strict'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Api, Sleep } from '../../helpers'
import { setChatActive } from '../../store/ducks/chatbot'
import { setToastActive, setToastMessageActive } from '../../store/ducks/toast'
import { addUserInteraction } from '../../store/ducks/user'

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
    dispatch(setToastMessageActive(false))
    if (!chatbot.active) {
      dispatch(addUserInteraction(user.interactions))
      Api.get('/watson').then(({ data }) => console.log(data))
    }
  }

  const handleToastMessage = async chatActive => {
    if (chatActive || user.interactions > 0) return false
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
