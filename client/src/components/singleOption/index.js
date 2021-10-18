import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format, utcToZonedTime } from 'date-fns-tz'

import { setMessages, setChatLoaderActive, setOptions } from '../../store/ducks/chatbot'
import { addUserInteraction } from '../../store/ducks/user'

import { Option, Row } from './style'

const singleOption = () => {
  const dispatch = useDispatch()
  const { chatbot } = useSelector(state => state)

  const handleContext = messages => {
    const lastInteraction = messages[chatbot.messages.length - 1]
    if (!lastInteraction) return false
  }

  const handleSingleOption = (input) => {
    dispatch(addUserInteraction('click-single-option', 'handleSingleOption', input))
    dispatch(setMessages({ content: input.text, context: {}, sender: 'user', time: format(utcToZonedTime(new Date(), 'America/Sao_paulo'), 'HH:mm') }))
    dispatch(setChatLoaderActive(true))
    dispatch(setOptions([]))
  }

  useEffect(() => {
    handleContext(chatbot.messages)
  }, [chatbot.messages])

  return (
    <Row>
      {chatbot.options && chatbot.options.map(({ label, value }, i) => (
        <Option onClick={() => handleSingleOption(value.input)} key={i}>{label}</Option>
      ))}
    </Row>
  )
}

export default singleOption
