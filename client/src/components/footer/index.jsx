import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format, utcToZonedTime } from 'date-fns-tz'

import { setChatActions, setChatActive, setChatLoaderActive, setMessages, setOptions } from '../../store/ducks/chatbot'
import { setToastActive } from '../../store/ducks/toast'
import { addUserInteraction, setUserEmail, setUserId, setUserName, setUserSchedules } from '../../store/ducks/user'

import { Email, Message, User } from '../../helpers'

import { Background, Button, Container, Input, Send } from './style'

const Footer = () => {
  const dispatch = useDispatch()
  const [context, setContext] = useState({})
  const [inputMessage, setInputMessage] = useState('')

  const { chatbot, watson, user } = useSelector(state => state)

  const handleContext = messages => {
    const lastInteraction = messages[chatbot.messages.length - 1]
    if (!lastInteraction) return false
    setContext({ ...lastInteraction.context })
  }

  const handleInput = ({ target }) => setInputMessage(target.value)

  // 13 enter - 27 escape
  const handleKey = async ({ keyCode }) => {
    if (keyCode === 13) return handleFlow(context, inputMessage)
    if (keyCode === 27) {
      dispatch(setChatActive(false))
      dispatch(setToastActive(true))
    }
  }

  const handleFlow = async (context, inputMessage) => {
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
      if ((Email.valid(inputMessage))) {
        const { _id, name } = await User.get({ email: inputMessage })
        if (_id) dispatch(setUserId(_id))
        if (name) dispatch(setUserName(name))

        context = {
          skills: {
            'main skill': {
              user_defined: {
                ...context?.skills['main skill']?.user_defined,
                userData: true,
                email: inputMessage,
                getEmail: false,
                getName: false,
                name: name
              }
            }
          }
        }

        dispatch(setChatActions({ getEmail: false }, ''))
        dispatch(setUserEmail(inputMessage))
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
        if (!user.id) {
          const { _id } = await User.create({ email: user.email, name: inputMessage })
          dispatch(setUserId(_id))
        }
      } else {
        canSubmit = false
      }
    }

    if (userDefined.getSchedules) {
      // UUIDV4
      if (((/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(inputMessage))) return handleUserSchedules({ context, message: inputMessage })
      canSubmit = false
    }

    if (!canSubmit || !inputMessage) return false
    return handleMessages({ context, message: inputMessage, sender: 'user' })
  }

  const handleMessages = ({ context, message, sender }) => {
    Message.create({ content: { context, message, sender }, sessionId: watson.session.id })
    setInputMessage('')
    dispatch(setChatLoaderActive(true))
    dispatch(setOptions([]))
    dispatch(setMessages({ content: message, context, sender, time: format(utcToZonedTime(new Date(), 'America/Sao_paulo'), 'HH:mm') }))
    dispatch(addUserInteraction('footer', 'handleFlow', { message: inputMessage }))
  }

  const handleUserSchedules = ({ context, message }) => {
    context = {
      skills: {
        'main skill': {
          user_defined: {
            ...context?.skills['main skill']?.user_defined,
            getSchedules: false,
            schedulesIdentifier: message
          }
        }
      }
    }
    dispatch(setUserSchedules(message))
    return handleMessages({ context, message: message, sender: 'user' })
  }

  useEffect(() => {
    handleContext(chatbot.messages)
  }, [chatbot.messages])

  return (
    <Container>
      <Background>
        <Input onChange={(e) => handleInput(e)} onKeyDown={e => handleKey(e)} placeholder={chatbot.input.placeholder || 'Digite sua mensagem...'} value={inputMessage} />
        <Button>
          <Send onClick={() => handleFlow(context, inputMessage)} />
        </Button>
      </Background>
    </Container>
  )
}

export default Footer
