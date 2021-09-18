import { Api } from '../../helpers'

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
  SET_USER_EMAIL: 'SET_USER_EMAIL',
  SET_USER_ID: 'SET_USER_ID',
  SET_USER_COORDS: 'SET_USER_COORDS',
  SET_USER_NAME: 'SET_USER_NAME',
  SET_USER_SCHEDULED_DATE: 'SET_USER_SCHEDULED_DATE',
  SET_USER_SCHEDULED_STATION: 'SET_USER_SCHEDULED_STATION',
  SET_USER_SCHEDULES: 'SET_USER_INTERACTION'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.SET_USER_EMAIL:
      return { ...state, email: payload.email }
    case Types.ADD_USER_INTERACTION:
      return { ...state, interactions: [...state.interactions, { ...payload }] }
    case Types.SET_USER_COORDS:
      return { ...state, coords: payload.coords }
    case Types.SET_USER_ID:
      return { ...state, id: payload.id }
    case Types.SET_USER_NAME:
      return { ...state, name: payload.name }
    case Types.SET_USER_SCHEDULED_DATE:
      return { ...state, scheduledDate: payload.scheduledDate }
    case Types.SET_USER_SCHEDULED_STATION:
      return { ...state, scheduledStation: payload.scheduledStation }
    case Types.SET_USER_SCHEDULES:
      return { ...state, schedules: payload.schedules }
    default:
      return state
  }
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
  return (dispatch, getState) => {
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

export const setUserSchedules = identifier => {
  return async (dispatch, getState) => {
    const { data } = await Api.get(`/schedules/${identifier}`)
  }
}
