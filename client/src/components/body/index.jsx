'use strict'

import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { Sleep } from '../../helpers'

import Bot from '../bot'
import Loader from '../loader'
import Options from '../options'
import User from '../user'

import { Container, Overflow } from './style'

const AlwaysScrollToBottom = () => {
  const elementRef = useRef()
  useEffect(() => elementRef.current.scrollIntoView({ behavior: 'smooth' }))
  return <div ref={elementRef} />
}

const Body = () => {
  const [scroll, setScroll] = useState(false)
  const { chatbot } = useSelector(state => state)

  const handleScroll = async chatActive => {
    await Sleep(700)
    setScroll(chatActive)
  }

  useEffect(() => {
    handleScroll(chatbot.active)
  }, [chatbot.active])

  useEffect(() => {
    if (!chatbot.messages.length) return () => false
  }, [chatbot.messages])

  return (
    <Container>
      { chatbot.active &&
        <>
          <Overflow>
            <Bot />
            <User />
            <Options />
            {chatbot.loader && <Loader />}
            {scroll && <AlwaysScrollToBottom />}
          </Overflow>
        </>
      }
    </Container>
  )
}

export default Body
