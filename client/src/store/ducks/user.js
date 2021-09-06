'use strict'

const INITIAL_STATE = {
  coords: {},
  name: '',
  email: '',
  interactions: []
}

export const Types = {
  ADD_USER_INTERACTION: 'ADD_USER_INTERACTION',
  SET_USER_EMAIL: 'SET_USER_EMAIL',
  SET_USER_ID: 'SET_USER_ID',
  SET_USER_COORDS: 'SET_USER_COORDS',
  SET_USER_NAME: 'SET_USER_NAME'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.SET_USER_EMAIL:
      return { ...state, email: payload.email }
    case Types.ADD_USER_INTERACTION:
      return { ...state, interactions: [...state.interactions, { ...payload }] }
    case Types.SET_USER_COORDS:
      return { ...state, coords: payload.coords }
    case Types.SET_USER_NAME:
      return { ...state, name: payload.name }
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
    console.log(getState())
    dispatch({
      type: Types.SET_USER_NAME,
      payload: {
        name
      }
    })
  }
}
