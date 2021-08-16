'use strict'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Sleep } from '../../helpers'

import Store from '../../store'
import { setChatActive } from '../../store/ducks/chatbot'
import { setToastActive, setToastMessageActive } from '../../store/ducks/toast'
import { addUserInteraction } from '../../store/ducks/user'

import { Button, Container, Logo, Message, Position } from './style'

const Toast = () => {
  const dispatch = useDispatch()
  const [toastMessageContent, setToastMessageContent] = useState('')

  const chatbot = useSelector(({ chatbot }) => chatbot)
  const toast = useSelector(({ toast }) => toast)

  const AnimateToastMessage = async () => {
    await Sleep(8000)
    let state = Store.getState()
    if (state.chatbot.active || state.user.interactions.length > 0) return false
    dispatch(setToastMessageActive(true))
    await Sleep(8000)
    state = Store.getState()
    if (state.chatbot.active || state.user.interactions.length > 0) return false
    dispatch(setToastMessageActive(false))
  }

  const handleChat = () => {
    dispatch(setChatActive(!chatbot.active))
    dispatch(setToastActive(!toast.active))
    dispatch(setToastMessageActive(false))
    dispatch(addUserInteraction('toast', 'handleChat', { toastMessage: toast.message.active }))
  }

  const handleToastMessage = async () => {
    const messages = [
      { tag: <span>Agendamento <br />de Biometria?</span> },
      { tag: <span>Agendamento <br />de CPF?</span> },
      { tag: <span>Agendamento <br />de RG?</span> },
      { tag: <span>Agendamento <br />de Titulo Eleitor?</span> },
      { tag: <span>Precisa consultar <br />um agendamento?</span> }
    ]

    const random = Math.floor(Math.random() * messages.length)
    setToastMessageContent(messages[random])
    AnimateToastMessage()
  }

  useEffect(() => {
    handleToastMessage()
  }, [])

  return (
    <Position {...toast}>
      <Container>
        <Message {...toast.message}>
          {toastMessageContent.tag}
        </Message>
        <Button onClick={handleChat}>
          <Logo />
        </Button>
      </Container>
    </Position>
  )
}

export default Toast
