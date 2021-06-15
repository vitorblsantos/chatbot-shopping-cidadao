'use strict'

import { Api, Date, LocalStorage } from '../../helpers'

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

    const storageSession = LocalStorage.Get('watsonSession')
    const storageSessionExpiration = LocalStorage.Get('watsonSessionExpiration')

    let session = ''
    let sessionValid = false

    if ((user.session.expiration && Date.compare(user.session.expiration, Date.current)) === 1) sessionValid = true
    if ((storageSessionExpiration && Date.compare(storageSessionExpiration, Date.current)) === 1) sessionValid = true

    if (sessionValid) {
      console.log(0)
      session = user.session.id || storageSession
    } else {
      const { data } = await Api.get('/watson/session')
      LocalStorage.Set('watsonSession', data)
      LocalStorage.Set('watsonSessionExpiration', Date.expiration)
      session = data
    }

    dispatch({
      type: Types.SET_USER_SESSION_ID,
      payload: {
        id: session,
        createdAt: Date.current,
        expiration: Date.expiration
      }
    })
  }
}
