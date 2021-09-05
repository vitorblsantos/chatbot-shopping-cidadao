import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setChatActions, setChatActive, setChatLoaderActive, setMessages, setOptions } from '../../store/ducks/chatbot'
import { setToastActive } from '../../store/ducks/toast'
import { addUserInteraction, setUserEmail, setUserName } from '../../store/ducks/user'

import { Message } from '../../helpers'

import { Background, Button, Container, Input, Send } from './style'

const Footer = () => {
  const dispatch = useDispatch()
  const [context, setContext] = useState({})
  const [inputMessage, setInputMessage] = useState('')

  const { chatbot, watson } = useSelector(state => state)

  const handleContext = messages => {
    const lastInteraction = messages[chatbot.messages.length - 1]
    if (!lastInteraction) return false
    setContext({ ...lastInteraction.context })
  }

  const handleInput = ({ target }) => setInputMessage(target.value)

  // 13 enter - 27 escape
  const handleKey = async ({ keyCode }) => {
    if (keyCode === 13) return handleMessage(context, inputMessage)
    if (keyCode === 27) {
      dispatch(setChatActive(false))
      dispatch(setToastActive(true))
    }
  }

  const handleMessage = (context, inputMessage) => {
    let canSubmit = true
    context = {
      skills: {
        'main skill': {
          user_defined: {
            ...chatbot.actions,
            ...context?.skills['main skill']?.user_defined,
            firstInteraction: false
          }
        }
      }
    }

    const userDefined = context.skills['main skill'].user_defined

    if (userDefined.getEmail) {
      if ((/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/.test(inputMessage))) {
        context = {
          skills: {
            'main skill': {
              user_defined: {
                ...context?.skills['main skill']?.user_defined,
                email: inputMessage,
                getEmail: false
              }
            }
          }
        }
        dispatch(setChatActions({ getEmail: false }, ''))
        setUserEmail(inputMessage)
      } else {
        canSubmit = false
      }
    }

    if (userDefined.getName) {
      if (typeof inputMessage === 'string') {
        context = {
          skills: {
            'main skill': {
              user_defined: {
                ...context?.skills['main skill']?.user_defined,
                getName: false,
                name: inputMessage,
                userData: true
              }
            }
          }
        }
        dispatch(setChatActions({ getName: false }, ''))
        dispatch(setUserName(inputMessage))
      } else {
        canSubmit = false
      }
    }

    if (!canSubmit || !inputMessage) return false
    Message.save({ content: { context, inputMessage, sender: 'user' }, sessionId: watson.session.id })
    dispatch(setChatLoaderActive(true))
    dispatch(setOptions([]))
    dispatch(addUserInteraction('footer', 'handleMessage', { message: inputMessage }))
    dispatch(setMessages({ content: inputMessage, context, sender: 'user' }))
    setInputMessage('')
  }

  useEffect(() => {
    handleContext(chatbot.messages)
  }, [chatbot.messages])

  return (
    <Container>
      <Background>
        <Input onChange={(e) => handleInput(e)} onKeyDown={e => handleKey(e)} placeholder={chatbot.input.placeholder || 'Digite sua mensagem...'} value={inputMessage} />
        <Button>
          <Send onClick={() => handleMessage(context, inputMessage)} />
        </Button>
      </Background>
    </Container>
  )
}

export default Footer
