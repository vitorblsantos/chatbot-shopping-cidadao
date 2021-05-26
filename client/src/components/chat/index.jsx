import React from 'react'
import { useSelector } from 'react-redux'

import Body from '../body'
import Footer from '../footer'
import Header from '../header'

import { Container } from './style'

const Chat = () => {
  const { active } = useSelector(({ chatbot }) => chatbot)
  return (
    <Container {...{ active }}>
      <Header />
      <Body />
      <Footer />
    </Container>
  )
}

export default Chat
