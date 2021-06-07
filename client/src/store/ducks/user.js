'use strict'

import { Api, Date } from '../../helpers'

const INITIAL_STATE = {
  interactions: [],
  session: {
    id: '',
    createdAt: '',
    expiration: ''
  }
}

export const Types = {
  SET_USER_INTERACTION: 'SET_USER_INTERACTION',
  SET_USER_SESSION_ID: 'SET_USER_SESSION_ID'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case Types.SET_USER_INTERACTION:
    return { ...state, interactions: [...state.interactions, { ...payload }] }
  case Types.SET_USER_SESSION_ID:
    return { ...state, session: { ...state.session, ...payload } }
  default :
    return state
  }
}

export const setUserInteraction = (description, origin, param) => {
  return (dispatch) => {
    dispatch({
      type: Types.SET_USER_INTERACTION,
      payload: {
        description,
        origin,
        ...param
      }
    })
  }
}

export function setUserSessionId () {
  return async (dispatch, getState) => {
    const { user } = getState()
    if (user.session.expiration && Date.compare(user.session.expiration, Date.current) === 1) return false
    const { data } = await Api.get('/watson/session')
    dispatch({
      type: Types.SET_USER_SESSION_ID,
      payload: {
        id: data,
        createdAt: Date.current,
        expiration: Date.expiration
      }
    })
  }
}
