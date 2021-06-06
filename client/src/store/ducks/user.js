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
  ADD_USER_INTERACTION: 'ADD_USER_INTERACTION',
  ADD_USER_SESSION_ID: 'ADD_USER_SESSION_ID'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case Types.ADD_USER_INTERACTION:
    return { ...state, interactions: [...state.interactions, { ...payload }] }
  case Types.ADD_USER_SESSION_ID:
    return { ...state, session: { ...state.session, ...payload } }
  default :
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

export function addUserSessionId () {
  return async (dispatch, getState) => {
    const { user } = getState()
    if (user.session.expiration && Date.compare(user.session.expiration, Date.current) === 1) return false
    const { data } = await Api.get('/watson/session')
    dispatch({
      type: Types.ADD_USER_SESSION_ID,
      payload: {
        id: data,
        createdAt: Date.current,
        expiration: Date.expiration
      }
    })
  }
}
