import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format, utcToZonedTime } from 'date-fns-tz'

import { setChatContext, setChatActive, setChatLoaderActive, setMessages, setOptions, setChatInputWarning, setChatInputPlaceholder } from '../../store/ducks/chatbot'
import { setToastActive } from '../../store/ducks/toast'
import { addUserInteraction, setUserEmail, setUserId, setUserName } from '../../store/ducks/user'

import { Email, User } from '../../helpers'

import { Button, Container, Input, Send, Wrapper } from './style'

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

    dispatch(setChatContext({ firstInteraction: false }))

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
      dispatch(setChatInputPlaceholder(''))
    }

    if (userDefined.getEmail) {
      if ((Email.valid(inputMessage))) {
        canSubmit = true
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
          dispatch(setChatContext({ getName: false, name: name, userData: true, userId: id }))
        }
        dispatch(setChatInputWarning(!canSubmit))
        dispatch(setChatInputPlaceholder(''))
        dispatch(setChatContext({ email: inputMessage, getEmail: false }))
        dispatch(setUserEmail(inputMessage))
      } else {
        canSubmit = false
        return dispatch(setChatInputWarning(!canSubmit))
      }
    }

    if (userDefined.getIdentifier) {
      // UUIDV4
      if (((/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(inputMessage)) || Email.valid(inputMessage)) {
        canSubmit = true
        dispatch(setChatInputWarning(!canSubmit))
        return handleUserIdentifier({ context, message: inputMessage })
      } else {
        canSubmit = false
        return dispatch(setChatInputWarning(!canSubmit))
      }
    }

    if (userDefined.getName) {
      if (typeof inputMessage === 'string') {
        canSubmit = true
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
        dispatch(setChatContext({ getName: false, name: inputMessage, userData: true }))
        dispatch(setUserName(inputMessage))
        if (!user.id) {
          const { id } = await User.create({ email: user.email, name: inputMessage })
          dispatch(setUserId(id))
        }
        dispatch(setChatInputWarning(!canSubmit))
      } else {
        canSubmit = false
        return dispatch(setChatInputWarning(!canSubmit))
      }
    }

    if (userDefined.getSchedules) {
      canSubmit = true
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
      dispatch(setChatInputWarning(!canSubmit))
      dispatch(setChatContext({ getSchedules: false }))
      dispatch(setChatInputPlaceholder(''))
    }

    if (userDefined.useLastScheduleData) {
      canSubmit = true
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
      dispatch(setChatInputWarning(!canSubmit))
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
    dispatch(setChatContext({ getIdentifier: false, schedulesIdentifier: message }))
    dispatch(setChatInputPlaceholder(''))
    return handleMessages({ context, message: message, sender: 'user' })
  }

  useEffect(() => {
    handleContext(chatbot.messages)
  }, [chatbot.messages])

  return (
    <Container>
      <Wrapper>
        <Input onChange={(e) => handleInput(e)} onKeyDown={e => handleKey(e)} placeholder={chatbot.input.placeholder || 'Digite sua mensagem...'} value={inputMessage} />
        <Button>
          <Send onClick={() => handleFlow(context, inputMessage)} />
        </Button>
      </Wrapper>
    </Container>
  )
}

export default Footer
