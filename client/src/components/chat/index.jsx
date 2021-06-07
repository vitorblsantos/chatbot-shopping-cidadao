'use strict'

import React from 'react'
import { useSelector } from 'react-redux'

import Body from '../body'
import Footer from '../footer'
import Header from '../header'

import { Container } from './style'

const Chat = () => {
  const { chatbot } = useSelector(state => state)
  return (
    <Container {...chatbot}>
      <Header />
      <Body />
      <Footer />
    </Container>
  )
}

export default Chat
