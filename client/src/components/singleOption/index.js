import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setMessages, setChatLoaderActive, setOptions } from '../../store/ducks/chatbot'
import { addUserInteraction } from '../../store/ducks/user'

import { Option, Row } from './style'

const singleOption = () => {
  const dispatch = useDispatch()
  const { chatbot } = useSelector(state => state)

  const handleSingleOption = (input) => {
    dispatch(addUserInteraction('click-single-option', 'handleSingleOption', input))
    dispatch(setMessages({ content: input.text, context: {}, sender: 'user' }))
    dispatch(setChatLoaderActive(true))
    dispatch(setOptions([]))
  }

  return (
    <Row>
      {chatbot.options && chatbot.options.map(({ label, value }, i) => (
        <Option onClick={() => handleSingleOption(value.input)} key={i}>{label}</Option>
      ))}
    </Row>
  )
}

export default singleOption
