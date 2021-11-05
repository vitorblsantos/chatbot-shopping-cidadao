import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format, utcToZonedTime } from 'date-fns-tz'

import { setChatContext, setChatActive, setChatLoaderActive, setMessages, setOptions } from '../../store/ducks/chatbot'
import { setToastActive } from '../../store/ducks/toast'
import { addUserInteraction, setUserEmail, setUserId, setUserName } from '../../store/ducks/user'

import { Email, User } from '../../helpers'

import { Background, Button, Container, Input, Send } from './style'

const Footer = () => {
  const dispatch = useDispatch()
  const [context, setContext] = useState({})
  const [inputMessage, setInputMessage] = useState('')

  const { chatbot, user } = useSelector(state => state)

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
            ...context?.skills['main skill']?.user_defined,
            firstInteraction: false
          }
        }
      }
    }

    dispatch(setChatContext({ firstInteraction: false }, ''))

    const userDefined = context.skills['main skill'].user_defined

    if (userDefined.finishedSchedule) {
      context = {
        skills: {
          'main skill': {
            user_defined: {
              ...context?.skills['main skill']?.user_defined,
              finishedSchedule: false
            }
          }
        }
      }
    }

    if (userDefined.getEmail) {
      if ((Email.valid(inputMessage))) {
        const { id, name } = await User.get({ email: inputMessage })
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
        if (id && name) {
          context.skills['main skill'].user_defined.getName = false
          context.skills['main skill'].user_defined.name = name
          context.skills['main skill'].user_defined.userData = true
          context.skills['main skill'].user_defined.userId = id
          dispatch(setUserId(id))
          dispatch(setUserName(name))
          dispatch(setChatContext({ getName: false, name: name, userData: true, userId: id }, ''))
        }
        dispatch(setChatContext({ email: inputMessage, getEmail: false }, ''))
        dispatch(setUserEmail(inputMessage))
      } else {
        canSubmit = false
      }
    }

    if (userDefined.getIdentifier) {
      // UUIDV4
      if (((/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(inputMessage)) || Email.valid(inputMessage)) return handleUserIdentifier({ context, message: inputMessage })
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
        dispatch(setChatContext({ getName: false, name: inputMessage, userData: true }, ''))
        dispatch(setUserName(inputMessage))
        if (!user.id) {
          const { id } = await User.create({ email: user.email, name: inputMessage })
          dispatch(setUserId(id))
        }
      } else {
        canSubmit = false
      }
    }

    if (userDefined.getSchedules) {
      context = {
        skills: {
          'main skill': {
            user_defined: {
              ...context?.skills['main skill']?.user_defined,
              getSchedules: false
            }
          }
        }
      }
      dispatch(setChatContext({ getSchedules: false }, ''))
    }

    if (userDefined.useLastScheduleData) {
      context = {
        skills: {
          'main skill': {
            user_defined: {
              ...context?.skills['main skill']?.user_defined,
              schedulesIdentifier: user.email,
              useLastScheduleData: false
            }
          }
        }
      }
      dispatch(setChatContext({ schedulesIdentifier: user.email, useLastScheduleData: false }))
    }

    if (!canSubmit || !inputMessage) return false
    return handleMessages({ context, message: inputMessage, sender: 'user' })
  }

  const handleMessages = ({ context, message, sender }) => {
    setInputMessage('')
    dispatch(setChatLoaderActive(true))
    dispatch(setOptions([]))
    dispatch(setMessages({ content: message, context, sender, time: format(utcToZonedTime(new Date(), 'America/Sao_paulo'), 'HH:mm') }))
    dispatch(addUserInteraction('footer', 'handleFlow', { message: inputMessage }))
  }

  const handleUserIdentifier = ({ context, message }) => {
    context = {
      skills: {
        'main skill': {
          user_defined: {
            ...context?.skills['main skill']?.user_defined,
            getIdentifier: false,
            schedulesIdentifier: message
          }
        }
      }
    }
    dispatch(setChatContext({ getIdentifier: false, schedulesIdentifier: message }, ''))
    // dispatch(setUserSchedules(message))
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
          <Send />
        </Button>
      </Background>
    </Container>
  )
}

export default Footer
