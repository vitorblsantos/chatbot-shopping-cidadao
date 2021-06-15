'use strict'

import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

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
  const [scroll, setScroll] = useState(false)
  const { chatbot } = useSelector(state => state)

  const handleScroll = async chatActive => {
    setScroll(chatActive)
  }

  useEffect(() => {
    handleScroll(chatbot.active)
  }, [chatbot.active])

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
