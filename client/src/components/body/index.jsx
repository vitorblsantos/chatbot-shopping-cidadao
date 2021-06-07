'use strict'

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Sleep } from '../../helpers'
import { setChatLoader, setMessages } from '../../store/ducks/chatbot'

import Bot from '../bot'
import Loader from '../loader'
import Options from '../options'
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
  const { chatbot, user } = useSelector(state => state)

  const handleScroll = async chatActive => {
    setScroll(chatActive)
  }

  const startFlow = async () => {
    if (!chatbot.active || !user.session.id) return false
    await Sleep(2000)
    dispatch(setMessages('bot', 'Olá! Eu sou Miguel. O novo Chatbot do UAI.'))
    await Sleep(1500)
    dispatch(setChatLoader(false))
    dispatch(setMessages('bot', 'Vou te ajudar a realizar alguns serviços que estão disponiveis em nosso portal.'))
  }

  useEffect(() => {
    handleScroll(chatbot.active)
  }, [chatbot.active])

  useEffect(() => {
    startFlow()
  }, [user.session.id])

  return (
    <Container>
      { chatbot.active &&
        <>
          <Overflow>
            {
              chatbot && chatbot.messages && chatbot.messages.map(({ content, sender }, i) => (
                <div key={i}>
                  {sender === 'bot' && <Bot {...{ content }} />}
                  {sender === 'user' && <User />}
                </div>
              ))
            }
            {chatbot.loader && <Loader />}
            {scroll && <AlwaysScrollToBottom />}
          </Overflow>
        </>
      }
    </Container>
  )
}

export default Body
