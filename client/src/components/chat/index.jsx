'use strict'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Sleep, Watson } from '../../helpers'
import { setChatLoaderActive, setMessages } from '../../store/ducks/chatbot'

import Body from '../body'
import Footer from '../footer'
import Header from '../header'

import { Container } from './style'

const Chat = () => {
  const dispatch = useDispatch()
  const { chatbot, user, watson } = useSelector(state => state)

  const firstInteraction = async () => {
    await Sleep(chatbot.loader.timer)

    const message = await Watson.sendMessage('ola', watson.session.id)
    console.log(message)

    dispatch(setMessages('bot', 'Olá! Eu sou Miguel. O novo Chatbot do UAI.'))

    await Sleep(chatbot.loader.timer)
    dispatch(setChatLoaderActive(false))
    dispatch(setMessages('bot', 'Vou te ajudar a realizar alguns serviços que estão disponiveis em nosso portal.'))
  }

  const startFlow = async () => {
    if (!user.interactions.length) return false
    if (!chatbot.active || !watson.session.id) return false
    if (user.interactions.length === 1) firstInteraction()
  }

  useEffect(() => {
    startFlow()
  }, [watson.session])

  return (
    <Container {...chatbot}>
      <Header />
      <Body />
      <Footer />
    </Container>
  )
}

export default Chat
