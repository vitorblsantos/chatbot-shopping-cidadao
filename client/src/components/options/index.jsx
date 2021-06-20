'use strict'

import React from 'react'
import { useDispatch } from 'react-redux'
import { object } from 'prop-types'

import { setMessages, setChatLoaderActive } from '../../store/ducks/chatbot'
import { addUserInteraction } from '../../store/ducks/user'
import { Container, Option, Row } from './style'

const Options = ({ content }) => {
  const dispatch = useDispatch()
  const handleOption = (input) => {
    dispatch(addUserInteraction('Options', 'handleOption', input))
    dispatch(setMessages('user', input.text))
    dispatch(setChatLoaderActive(true))
  }

  return (
    <Row>
      <Container>
        {
          content.options && content.options.map(({ value }, i) => {
            return (
              <Option key={i} onClick={() => handleOption(value.input)}>
                {value.input.text}
              </Option>
            )
          })
        }
      </Container>
    </Row>
  )
}

Options.propTypes = {
  content: object
}

export default Options
