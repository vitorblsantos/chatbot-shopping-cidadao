import { Schedule, Sleep } from '../../helpers'
import { setChatContext, setChatInputPlaceholder, setChatLoaderActive, setMessages } from '../../store/ducks/chatbot'
import { format, utcToZonedTime } from 'date-fns-tz'

const INITIAL_STATE = {
  coords: {},
  name: '',
  email: '',
  id: '',
  interactions: [],
  scheduledDate: new Date(),
  scheduledStation: '',
  schedules: []
}

export const Types = {
  ADD_USER_INTERACTION: 'ADD_USER_INTERACTION',
  CLEAR_USER_SCHEDULES: 'CLEAR_USER_SCHEDULES',
  RESTART_USER_SCHEDULES: 'RESTART_USER_SCHEDULES',
  SET_USER_EMAIL: 'SET_USER_EMAIL',
  SET_USER_ID: 'SET_USER_ID',
  SET_USER_COORDS: 'SET_USER_COORDS',
  SET_USER_NAME: 'SET_USER_NAME',
  SET_USER_SCHEDULED_DATE: 'SET_USER_SCHEDULED_DATE',
  SET_USER_SCHEDULED_STATION: 'SET_USER_SCHEDULED_STATION',
  SET_USER_SCHEDULES: 'SET_USER_INTERACTION'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  if (type === Types.ADD_USER_INTERACTION) return { ...state, interactions: [...state.interactions, { ...payload }] }
  if (type === Types.CLEAR_USER_SCHEDULES) return { ...state, schedules: [] }
  if (type === Types.RESTART_USER_SCHEDULES) return { ...INITIAL_STATE }
  if (type === Types.SET_USER_COORDS) return { ...state, coords: payload.coords }
  if (type === Types.SET_USER_EMAIL) return { ...state, email: payload.email }
  if (type === Types.SET_USER_ID) return { ...state, id: payload.id }
  if (type === Types.SET_USER_NAME) return { ...state, name: payload.name }
  if (type === Types.SET_USER_SCHEDULED_DATE) return { ...state, scheduledDate: payload.scheduledDate }
  if (type === Types.SET_USER_SCHEDULED_STATION) return { ...state, scheduledStation: payload.scheduledStation }
  if (type === Types.SET_USER_SCHEDULES) return { ...state, schedules: [...state.schedules, ...payload] }
  return state
}

export const addUserInteraction = (description, origin, param) => {
  return {
    type: Types.ADD_USER_INTERACTION,
    payload: {
      description,
      origin,
      ...param
    }
  }
}

export const clearUserSchedules = () => {
  return {
    type: Types.CLEAR_USER_SCHEDULES
  }
}

export const restartUserSchedules = () => {
  return {
    type: Types.RESTART_USER_SCHEDULES
  }
}

export const setUserEmail = email => {
  return {
    type: Types.SET_USER_EMAIL,
    payload: {
      email
    }
  }
}

export const setUserId = id => {
  return {
    type: Types.SET_USER_ID,
    payload: {
      id
    }
  }
}

export const setUserCoords = coords => {
  return {
    type: Types.SET_USER_COORDS,
    payload: {
      coords
    }
  }
}

export const setUserName = name => {
  return (dispatch, _) => {
    dispatch({
      type: Types.SET_USER_NAME,
      payload: {
        name
      }
    })
  }
}

export const setUserScheduledDate = scheduledDate => {
  return {
    type: Types.SET_USER_SCHEDULED_DATE,
    payload: {
      scheduledDate
    }
  }
}

export const setUserScheduledStation = scheduledStation => {
  return {
    type: Types.SET_USER_SCHEDULED_STATION,
    payload: {
      scheduledStation
    }
  }
}

export const setUserSchedules = (skills) => {
  return async (dispatch, getState) => {
    const { chatbot } = getState(state => state)
    let identifier = chatbot.context.schedulesIdentifier
    if (skills.useLastScheduleData) identifier = skills.email
    const schedules = await Schedule.getByIdentifier(identifier)
    dispatch(setChatLoaderActive(true))
    await Sleep(5000)
    dispatch(setChatLoaderActive(false))
    if (schedules.length) {
      dispatch({
        type: Types.SET_USER_SCHEDULES,
        payload: schedules
      })
      dispatch(setChatContext({ findSchedules: true }))
      dispatch(setChatInputPlaceholder(''))
    } else {
      const lastInteraction = chatbot.messages[chatbot.messages.length - 1]
      dispatch(clearUserSchedules())
      dispatch(setChatContext({ findSchedules: false, getIdentifier: false }))
      dispatch(setChatInputPlaceholder(''))
      dispatch(setChatLoaderActive(true))
      dispatch(setMessages({ content: { text: 'Não encontrei nenhum agendamento ativo para esse email/identificador.' }, context: { ...lastInteraction.context }, sender: 'bot', time: format(utcToZonedTime(new Date(), 'America/Sao_paulo'), 'HH:mm') }))
      await Sleep(chatbot.loader.timer)
      dispatch(setMessages({ content: { text: `Por favor, entre em contato com a central ${'<a href="http://central.uai.com.br/minha_central/index.shtml">clicando aqui</a>'}` }, context: { ...lastInteraction.context }, sender: 'bot', time: format(utcToZonedTime(new Date(), 'America/Sao_paulo'), 'HH:mm') }))
      return dispatch(setChatLoaderActive(false))
    }
  }
}
