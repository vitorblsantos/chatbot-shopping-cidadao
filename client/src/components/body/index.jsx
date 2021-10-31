import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import Bot from '../bot'
import Loader from '../loader'
import Options from '../options'
import Schedules from '../schedules'
import SingleOption from '../singleOption'
import User from '../user'

import { Container, Overflow, Row } from './style'
// import { Container, Overflow, Row, Status, Warning } from './style'

const AlwaysScrollToBottom = () => {
  const ref = useRef()
  useEffect(() => ref.current.scrollIntoView())
  return <div ref={ref} />
}

const Body = () => {
  const { chatbot, user } = useSelector(state => state)

  return (
    <Container>
      {chatbot.active &&
        <>
          <Overflow>
            {
              chatbot.messages.map(({ sender, content, time }, i) => {
                return (
                  <Row key={i} user={sender === 'user'}>
                    {sender === 'bot' && <Bot {...{ content, time }} />}
                    {sender === 'user' && <User {...{ content, time }} />}
                  </Row>
                )
              })
            }
            {chatbot.loader.active ? <Loader /> : ''}
            {chatbot.options.length && chatbot.options.length === 1 ? <SingleOption /> : ''}
            {!chatbot.loader.active && user.schedules.length > 0 ? <Schedules /> : ''}
            <AlwaysScrollToBottom />
          </Overflow>
          {chatbot.options.length && chatbot.options.length >= 2 ? <Options /> : ''}
          {/* <Status>
            <Warning /> <span>teste</span>
          </Status> */}
        </>}
    </Container>
  )
}

export default Body
