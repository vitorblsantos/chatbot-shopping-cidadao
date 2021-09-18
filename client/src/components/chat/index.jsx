import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format, utcToZonedTime } from 'date-fns-tz'

import { Api, Distance, Notification, Schedule, Sleep, Watson } from '../../helpers'

import { getStations } from '../../store/ducks/stations'

import { setChatContext, setChatLoaderActive, setMessages, setOptions } from '../../store/ducks/chatbot'
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

    if (!lastInteraction || lastInteraction.sender === 'bot' || !watsonId) return false

    const { context, output } = await Watson.sendMessage({ context: lastInteraction.context, message: lastInteraction.content, sessionId: watsonId })

    if (!output.generic) return false

    await handleBotMessage(context, output.generic, watsonId)

    const skills = context.skills['main skill'].user_defined

    if (!skills) return false

    if (skills.getDate) handleDate(skills)
    if (skills.getEmail) dispatch(setChatContext({ getEmail: skills.getEmail }, 'Digite seu e-mail...'))
    if (skills.getLocation) handleGeolocation(skills)
    if (skills.getName) dispatch(setChatContext({ getName: skills.getName }, 'Digite seu nome...'))
    if (skills.getService) dispatch(setChatContext({ getService: skills.getService }, 'Selecione o servico desejado...'))
    if (skills.getSchedules) dispatch(setChatContext({ getSchedules: skills.getSchedules }, 'Digite o email ou id do agendamento'))
    if (skills.finishedSchedule) handleSchedule(skills)
    if (skills.useLastScheduleData) handleLastScheduleData()
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
    dispatch(setChatContext({ firstInteraction: true }, ''))

    const { context, output } = await Watson.sendMessage({ context: draftContext, message: '', sessionId: watsonId })
    if (!output.generic) return false
    await handleBotMessage(context, output.generic, watsonId)
  }

  const handleBotMessage = async (context, messages, watsonId) => {
    for (let counter = 0; counter < messages.length; counter++) {
      messages[counter].sender = 'bot'
      if (messages[counter].response_type === 'option') return (dispatch(setOptions(messages[counter].options)) && dispatch(setChatLoaderActive(false)))
      await Sleep(chatbot.loader.timer)
      dispatch(setMessages({ content: messages[counter], context, sender: 'bot', time: format(utcToZonedTime(new Date(), 'America/Sao_paulo'), 'HH:mm') }))
    }
    dispatch(setChatLoaderActive(false))
  }

  const handleDate = async ({ getDate }) => {
    const options = []
    dispatch(setChatContext({ getDate }, 'Selecione a data desejada:'))
    const { data } = await Api.get('/schedules/available')
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
    dispatch(setChatContext({ getDate }, 'Selecione a data desejada:'))
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
            text: '',
            value: ''
          }
        }
      }
      option.label = el.description
      option.value.input.text = el.description
      option.value.input.value = el.id
      return options.push(option)
    })

    dispatch(setOptions(options))

    dispatch(setChatContext({ getLocation }, 'Selecione o posto de atendimento:'))
  }

  const handleLastScheduleData = () => {
    console.log(0)
  }

  const handlePositions = position => {
    if (!position) return false
    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    dispatch(setUserCoords(coords))
  }

  const handleSchedule = skills => {
    dispatch(setChatContext({ finishedSchedule: skills.finishedSchedule }, `Ainda precisa de ajuda, ${user.name[0].toUpperCase() + user.name.slice(1)}?`))
    Notification.sendEmail({ email: user.email, id: user.id, link: '#', usuario: user.name })
    Schedule.create({ date: user.scheduledDate, session: watson.session._id, station: user.scheduledStation, user: user.id })
  }

  const handleWatsonId = ({ id }) => {
    if (!id) return false
    setWatsonId(id)
  }

  const setupSession = async ({ active }) => {
    if (!active) return false
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(handlePositions)
    dispatch(setWatsonSessionId())
    dispatch(setWatsonFlowStart(true))
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
