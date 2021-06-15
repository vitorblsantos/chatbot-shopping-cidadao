'use strict'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Sleep, Watson } from '../../helpers'
import { setChatLoaderActive, setMessages } from '../../store/ducks/chatbot'
import { setUserId } from '../../store/ducks/user'

import Body from '../body'
import Footer from '../footer'
import Header from '../header'

import { Container } from './style'

const Chat = () => {
  const dispatch = useDispatch()
  const { chatbot, user, watson } = useSelector(state => state)

  const firstInteraction = async () => {
    await Sleep(chatbot.loader.timer)

    const { output, userId } = await Watson.sendMessage('oi', watson.session.id)
    dispatch(setUserId(userId))

    Promise.all(
      output.generic.map(async ({ text }) => {
        dispatch(setMessages('bot', text))
        await Sleep(chatbot.loader.timer)
      })
    )
    dispatch(setChatLoaderActive(false))
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
