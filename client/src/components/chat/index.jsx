import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Body from '../body'
import Footer from '../footer'
import Header from '../header'

import { Container } from './style'

const Chat = () => {
  const [active, setActive] = useState(false)
  const { config } = useSelector(({ chatbot }) => chatbot)

  useEffect(() => {
    setActive(config.active)
  }, [config])

  return (
    <Container {...{ active }}>
      <Header />
      <Body />
      <Footer />
    </Container>
  )
}

export default Chat
