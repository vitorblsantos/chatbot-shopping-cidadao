'use strict'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Sleep, Watson } from '../../helpers'

import { setChatActions, setChatLoaderActive, setMessages, setOptions } from '../../store/ducks/chatbot'
import { setWatsonFlowStart, setWatsonSessionId } from '../../store/ducks/watson'

import Body from '../body'
import Footer from '../footer'
import Header from '../header'

import { Container } from './style'
const Chat = () => {
  const dispatch = useDispatch()
  const { chatbot, user, watson } = useSelector(state => state)
  const [watsonId, setWatsonId] = useState('')

  const continuousInteraction = async () => {
    const lastInteraction = chatbot.messages[chatbot.messages.length - 1]
    if (!lastInteraction || !watsonId) return false
    if (lastInteraction.sender === 'bot') return restartFlow()

    const { context, output } = await Watson.sendMessage({ context: lastInteraction.context, message: lastInteraction.content, sessionId: watsonId })

    if (!output.generic) return false

    await handleBotMessage(context, output.generic)

    const skills = context.skills['main skill'].user_defined

    if (!skills) return false

    if (skills.getEmail) dispatch(setChatActions({ getEmail: skills.getEmail }, 'Digite seu e-mail:'))
    if (skills.getName) dispatch(setChatActions({ getName: skills.getName }, 'Digite seu nome:'))
    // if ((!skills.getEmail && skills.email) && (!skills.getName && skills.name)) await Users.save({ email: user.email, name: user.name })
  }

  const firstInteraction = async () => {
    if (!watsonId) return false
    const draftContext = {
      skills: {
        'main skill': {
          user_defined: {
            firstInteraction: true
          }
        }
      }
    }

    const { context, output } = await Watson.sendMessage({ context: draftContext, message: '', sessionId: watsonId })
    if (!output.generic) return false
    await handleBotMessage(context, output.generic)
  }

  const handleBotMessage = async (context, messages) => {
    for (let counter = 0; counter < messages.length; counter++) {
      messages[counter].sender = 'bot'
      if (messages[counter].response_type === 'option') return (dispatch(setOptions(messages[counter].options)) && dispatch(setChatLoaderActive(false)))
      await Sleep(chatbot.loader.timer)
      dispatch(setMessages({ content: messages[counter], context, sender: 'bot' }))
    }
    dispatch(setChatLoaderActive(false))
  }

  const handleFlow = async chatbot => {
    if (!chatbot.active) return false
    if (user.interactions.length === 1) return firstInteraction()
    return continuousInteraction()
  }

  const handleWatsonId = ({ id }) => {
    if (!id) return false
    setWatsonId(id)
  }

  const restartFlow = async () => {
    dispatch(setChatLoaderActive(true))
    dispatch(setOptions([]))
    const lastInteraction = chatbot.messages[chatbot.messages.length - 1]
    const { context, output } = await Watson.sendMessage({ context: lastInteraction.context, message: '', sessionId: watsonId })

    if (!output.generic) return false

    await handleBotMessage(context, output.generic)
  }

  const setupSession = async ({ active }) => {
    if (!active) return false
    await dispatch(setWatsonSessionId())
    await dispatch(setWatsonFlowStart(true))
  }

  useEffect(() => {
    setupSession(chatbot)
  }, [chatbot.active])

  useEffect(() => {
    handleWatsonId(watson.session)
  }, [watson.session.id])

  useEffect(() => {
    handleFlow(chatbot)
  }, [watsonId])

  useEffect(() => {
    handleFlow(chatbot)
  }, [user.interactions])

  return (
    <Container {...chatbot}>
      <Header />
      <Body />
      <Footer />
    </Container>
  )
}

export default Chat
