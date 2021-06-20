'use strict'

import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import Bot from '../bot'
import Loader from '../loader'
import Options from '../options'
import User from '../user'

import { Container, Overflow, Row } from './style'

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
              chatbot.messages && chatbot.messages.map(({ sender, content }, i) => {
                return (
                  <Row key={i} options={content.options || false} user={sender === 'user'}>
                    {sender === 'bot' && (content.options ? <Options {...{ content }} /> : <Bot {...{ content }} />)}
                    {sender === 'user' && <User {...{ content }} />}
                  </Row>
                )
              }
              )
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
