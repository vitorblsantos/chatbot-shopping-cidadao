'use strict'

import { Api, Date, LocalStorage } from '../../helpers'

const INITIAL_STATE = {
  session: {
    id: '',
    createdAt: '',
    expiration: ''
  },
  flow: {
    start: false
  }
}

export const Types = {
  SET_WATSON_SESSION_ID: 'SET_WATSON_SESSION_ID'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case Types.SET_WATSON_SESSION_ID:
    return { ...state, session: { ...state.session, ...payload } }
  default:
    return state
  }
}

export function setWatsonSessionId () {
  return async (dispatch, getState) => {
    const { watson } = getState()

    const storageSession = LocalStorage.Get('watsonSession')
    const storageSessionExpiration = LocalStorage.Get('watsonSessionExpiration')

    let session = ''
    let sessionValid = false

    if ((watson.session.expiration && Date.compare(watson.session.expiration, Date.current)) === 1) sessionValid = true
    if ((storageSessionExpiration && Date.compare(storageSessionExpiration, Date.current)) === 1) sessionValid = true

    if (sessionValid) {
      session = watson.session.id || storageSession
    } else {
      const { data } = await Api.get('/watson/session')
      LocalStorage.Set('watsonSession', data)
      LocalStorage.Set('watsonSessionExpiration', Date.expiration)
      session = data
    }

    dispatch({
      type: Types.SET_WATSON_SESSION_ID,
      payload: {
        id: session,
        createdAt: Date.current,
        expiration: Date.expiration
      }
    })
  }
}
