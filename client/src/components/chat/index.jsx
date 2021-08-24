'use strict'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import format from 'date-fns/format'

import { Api, Distance, Sleep, Watson } from '../../helpers'

import { getStations } from '../../store/ducks/stations'

import { setChatActions, setChatLoaderActive, setMessages, setOptions } from '../../store/ducks/chatbot'
import { setUserCoords } from '../../store/ducks/user'
import { setWatsonFlowStart, setWatsonSessionId } from '../../store/ducks/watson'

import Body from '../body'
import Footer from '../footer'
import Header from '../header'

import { Container } from './style'
const Chat = () => {
  const dispatch = useDispatch()
  const { chatbot, stations, user, watson } = useSelector(state => state)
  const [watsonId, setWatsonId] = useState('')

  const continuousInteraction = async () => {
    const lastInteraction = chatbot.messages[chatbot.messages.length - 1]
    if (!lastInteraction || !watsonId) return false
    if (lastInteraction.sender === 'bot') return restartFlow()

    const { context, output } = await Watson.sendMessage({ context: lastInteraction.context, message: lastInteraction.content, sessionId: watsonId })

    if (!output.generic) return false

    await handleBotMessage(context, output.generic)

    const skills = context.skills['main skill'].user_defined

    if (!skills) return false

    if (skills.getDate) handleDate(skills)
    if (skills.getEmail) dispatch(setChatActions({ getEmail: skills.getEmail }, 'Digite seu e-mail:'))
    if (skills.getLocation) handleGeolocation(skills)
    if (skills.getName) dispatch(setChatActions({ getName: skills.getName }, 'Digite seu nome:'))
    if (skills.getService) dispatch(setChatActions({ getService: skills.getService }, 'Selecione o servico desejado:'))
    // if ((!skills.getEmail && skills.email) && (!skills.getName && skills.name)) await Users.save({ email: user.email, name: user.name })
  }

  const firstInteraction = async () => {
    if (!watsonId) return false
    const draftContext = {
      skills: {
        'main skill': {
          user_defined: {
            firstInteraction: true
          }
        }
      }
    }

    const { context, output } = await Watson.sendMessage({ context: draftContext, message: '', sessionId: watsonId })
    if (!output.generic) return false
    await handleBotMessage(context, output.generic)
  }

  const handleBotMessage = async (context, messages) => {
    for (let counter = 0; counter < messages.length; counter++) {
      messages[counter].sender = 'bot'
      if (messages[counter].response_type === 'option') return (dispatch(setOptions(messages[counter].options)) && dispatch(setChatLoaderActive(false)))
      await Sleep(chatbot.loader.timer)
      dispatch(setMessages({ content: messages[counter], context, sender: 'bot' }))
    }
    dispatch(setChatLoaderActive(false))
  }

  const handleDate = async ({ getDate }) => {
    const options = []
    const { data } = await Api.get('/data/schedules/available')
    data && data.map(el => {
      const option = {
        label: '',
        value: {
          input: {
            text: ''
          }
        }
      }
      option.label = format(new Date(el), 'dd/MM/yyyy HH:mm')
      option.value.input.text = format(new Date(el), 'dd/MM/yyyy HH:mm')
      options.push(option)
      return el
    })
    dispatch(setOptions(options))
    dispatch(setChatActions({ getDate }, 'Selecione a data desejada:'))
  }

  const handleFlow = async chatbot => {
    if (!chatbot.active) return false
    if (user.interactions.length === 1) return firstInteraction()
    return continuousInteraction()
  }

  const handleGeolocation = ({ getLocation }) => {
    const options = []
    if (!user.coords.latitude || !user.coords.longitude) return false

    stations.map(el => {
      el.distance = Distance(user.coords.latitude, user.coords.longitude, el.latitude, el.longitude)
      return el
    })

    const draftStations = stations.sort((a, b) => (a.distance > b.distance) ? 1 : -1)

    draftStations.slice(0, 5).map(el => {
      const option = {
        label: '',
        value: {
          input: {
            text: ''
          }
        }
      }
      option.label = el.description
      option.value.input.text = el.description
      options.push(option)
      return el
    })

    dispatch(setOptions(options))

    dispatch(setChatActions({ getLocation }, 'Selecione o posto de atendimento:'))
  }

  const handlePositions = position => {
    if (!position) return false
    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    dispatch(setUserCoords(coords))
  }

  const handleWatsonId = ({ id }) => {
    if (!id) return false
    setWatsonId(id)
  }

  const restartFlow = async () => {
    dispatch(setChatLoaderActive(true))
    dispatch(setOptions([]))
    const lastInteraction = chatbot.messages[chatbot.messages.length - 1]
    const { context, output } = await Watson.sendMessage({ context: lastInteraction.context, message: '', sessionId: watsonId })

    if (!output.generic) return false

    await handleBotMessage(context, output.generic)
  }

  const setupSession = async ({ active }) => {
    if (!active) return false
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(handlePositions)
    await dispatch(setWatsonSessionId())
    await dispatch(setWatsonFlowStart(true))
  }

  useEffect(() => {
    dispatch(getStations())
  }, [])

  useEffect(() => {
    setupSession(chatbot)
  }, [chatbot.active])

  useEffect(() => {
    handleWatsonId(watson.session)
  }, [watson.session.id])

  useEffect(() => {
    handleFlow(chatbot)
  }, [watsonId])

  useEffect(() => {
    handleFlow(chatbot)
  }, [user.interactions])

  return (
    <Container {...chatbot}>
      <Header />
      <Body />
      <Footer />
    </Container>
  )
}

export default Chat
