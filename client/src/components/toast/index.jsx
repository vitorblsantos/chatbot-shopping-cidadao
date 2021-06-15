'use strict'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Sleep } from '../../helpers'

import Store from '../../store'
import { setChatActive } from '../../store/ducks/chatbot'
import { setToastActive, setToastMessage } from '../../store/ducks/toast'
import { setUserInteraction } from '../../store/ducks/user'
import { setWatsonSessionId } from '../../store/ducks/watson'

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
    dispatch(setToastMessage(true))
    await Sleep(8000)
    state = Store.getState()
    if (state.chatbot.active || state.user.interactions.length > 0) return false
    dispatch(setToastMessage(false))
  }

  const handleChat = () => {
    dispatch(setChatActive(!chatbot.active))
    dispatch(setToastActive(!toast.active))
    dispatch(setToastMessage(false))
    handleSessionId(!chatbot.active)
    dispatch(setUserInteraction('Toast', 'handleChat', { toastMessage: toast.message.active }))
  }

  const handleMessage = async () => {
    if (!chatbot.active) return false
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

  const handleSessionId = chatActive => {
    if (!chatActive) return false
    dispatch(setWatsonSessionId())
  }

  useEffect(() => {
    handleMessage()
  }, [chatbot.active])

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
