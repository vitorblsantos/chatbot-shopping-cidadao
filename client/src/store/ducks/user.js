'use strict'

const INITIAL_STATE = {
  id: '',
  interactions: []
}

export const Types = {
  ADD_USER_INTERACTION: 'ADD_USER_INTERACTION',
  SET_USER_ID: 'SET_USER_ID'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case Types.SET_USER_ID:
    return { ...state, ...payload }
  case Types.ADD_USER_INTERACTION:
    return { ...state, interactions: [...state.interactions, { ...payload }] }
  default:
    return state
  }
}

export const addUserInteraction = (description, origin, param) => {
  return (dispatch) => {
    dispatch({
      type: Types.ADD_USER_INTERACTION,
      payload: {
        description,
        origin,
        ...param
      }
    })
  }
}

export const setUserId = id => {
  return (dispatch) => {
    dispatch({
      type: Types.SET_USER_ID,
      payload: {
        id
      }
    })
  }
}
