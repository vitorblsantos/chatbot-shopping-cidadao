'use strict'

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Sleep } from '../../helpers'
import { setChatLoaderActive, setMessages } from '../../store/ducks/chatbot'

import Bot from '../bot'
import Loader from '../loader'
import User from '../user'

import { Container, Overflow } from './style'

const AlwaysScrollToBottom = () => {
  const reference = useRef()
  useEffect(() => reference.current.scrollIntoView({ behavior: 'smooth' }))
  return <div ref={reference} />
}

const Body = () => {
  const dispatch = useDispatch()
  const [scroll, setScroll] = useState(false)
  const { chatbot, user, watson } = useSelector(state => state)

  const firstInteraction = async () => {
    await Sleep(chatbot.loader.timer)
    dispatch(setMessages('bot', 'Olá! Eu sou Miguel. O novo Chatbot do UAI.'))

    await Sleep(chatbot.loader.timer)
    dispatch(setChatLoaderActive(false))
    dispatch(setMessages('bot', 'Vou te ajudar a realizar alguns serviços que estão disponiveis em nosso portal.'))
  }

  const handleScroll = async chatActive => {
    setScroll(chatActive)
  }

  const startFlow = async () => {
    if (!user.interactions.length) return false
    if (!chatbot.active || !watson.session.id) return false
    if (user.interactions.length === 1) firstInteraction()
  }

  useEffect(() => {
    handleScroll(chatbot.active)
  }, [chatbot.active])

  useEffect(() => {
    startFlow()
  }, [watson.session])

  return (
    <Container>
      { chatbot.active &&
        <>
          <Overflow>
            {
              chatbot && chatbot.messages && chatbot.messages.map(({ content, sender }, i) => (
                <div key={i}>
                  {sender === 'bot' && <Bot {...{ content }} />}
                  {sender === 'user' && <User {...{ content }} />}
                </div>
              ))
            }
            {chatbot.loader.active && <Loader />}
            {scroll && <AlwaysScrollToBottom />}
          </Overflow>
        </>
      }
    </Container>
  )
}

export default Body
