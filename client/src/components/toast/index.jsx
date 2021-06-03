'use strict'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setChatActive } from '../../store/ducks/chatbot'
import { setToastActive, setToastMessageActive } from '../../store/ducks/toast'

import { Button, Container, Logo } from './style'

import { Sleep } from '../../helpers'

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
    await Sleep(2000)
    dispatch(setToastMessageActive(true))
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
