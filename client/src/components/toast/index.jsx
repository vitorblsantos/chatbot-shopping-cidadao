'use strict'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setChatActive } from '../../store/ducks/chatbot'
import { setToastActive } from '../../store/ducks/toast'

import { Button, Container, Logo } from './style'

const Toast = () => {
  const dispatch = useDispatch()

  const chatbot = useSelector(({ chatbot }) => chatbot)
  const toast = useSelector(({ toast }) => toast)

  const handleChat = () => {
    dispatch(setChatActive(!chatbot.active))
    dispatch(setToastActive(!toast.active))
  }

  const handleToastMessage = async chatActive => {
    if (chatActive) return false
  }

  useEffect(() => {
    handleToastMessage(chatbot.active)
  }, [chatbot])

  return (
    <Container {...toast}>

      <Button onClick={handleChat}>
        <Logo />
      </Button>
    </Container>
  )
}

export default Toast
