'use strict'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Sleep, Watson } from '../../helpers'

import { setChatActions, setChatLoaderActive, setMessages, setOptions } from '../../store/ducks/chatbot'
import { setUserId } from '../../store/ducks/user'
import { setWatsonFlowStart } from '../../store/ducks/watson'

import Body from '../body'
import Footer from '../footer'
import Header from '../header'

import { Container } from './style'

const Chat = () => {
  const dispatch = useDispatch()
  const { chatbot, user, watson } = useSelector(state => state)

  const handleBotMessage = async messages => {
    for (let counter = 0; counter < messages.length; counter++) {
      messages[counter].sender = 'bot'
      if (messages[counter].response_type === 'option') return (dispatch(setOptions(messages[counter].options)) && dispatch(setChatLoaderActive(false)))
      await Sleep(chatbot.loader.timer)
      dispatch(setMessages('bot', messages[counter]))
    }
    dispatch(setChatLoaderActive(false))
  }

  const firstInteraction = async () => {
    const { output, user_id: userId } = await Watson.sendMessage('', watson.session.id)
    dispatch(setUserId(userId))
    dispatch(setWatsonFlowStart(true))
    if (!output.generic) return false
    await handleBotMessage(output.generic)
  }

  const watsonInteraction = async () => {
    if (!chatbot.messages.length) return false
    const lastInteraction = chatbot.messages[chatbot.messages.length - 1]

    if (lastInteraction.sender === 'bot') return false

    const { context, output } = await Watson.sendMessage(lastInteraction.content, watson.session.id)
    if (!output.generic) return false

    await handleBotMessage(output.generic)

    const skills = context.skills['main skill'].user_defined

    if (!skills) return false

    if (skills.getEmail) dispatch(setChatActions(skills, 'Digite seu e-mail:'))
  }

  const startFlow = async () => {
    if (!user.interactions.length) return false
    if (!chatbot.active || !watson.session.id) return false
    if (user.interactions.length === 1) firstInteraction()
  }

  useEffect(() => {
    startFlow()
  }, [watson.session])

  useEffect(() => {
    watsonInteraction()
  }, [chatbot.messages])

  return (
    <Container {...chatbot}>
      <Header />
      <Body />
      <Footer />
    </Container>
  )
}

export default Chat
