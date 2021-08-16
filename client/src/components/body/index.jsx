'use strict'

import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import Bot from '../bot'
import Loader from '../loader'
import Options from '../options'
import SingleOption from '../singleOption'
import User from '../user'

import { Container, Overflow, Row, ScrollBottom, Status, Warning } from './style'

const Body = () => {
  const { chatbot } = useSelector(state => state)
  const reference = useRef('')

  useEffect(() => {
    reference.current && reference.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
  })

  return (
    <Container>
      { chatbot.active &&
        <>
          <Overflow>
            {
              chatbot.messages.map(({ sender, content }, i) => {
                return (
                  <Row key={i} options={content.options || false} user={sender === 'user'}>
                    {sender === 'bot' && <Bot {...{ content }} />}
                    {sender === 'user' && <User {...{ content }} />}
                  </Row>
                )
              }
              )
            }
            {chatbot.loader.active && <Loader />}
            {chatbot.options.length && chatbot.options.length === 1 ? <SingleOption /> : ''}
            <ScrollBottom ref={reference} />
          </Overflow>
          {chatbot.options.length && chatbot.options.length >= 2 ? <Options /> : ''}
          <Status>
            <Warning /> <span>teste</span>
          </Status>
        </>
      }
    </Container>
  )
}

export default Body
