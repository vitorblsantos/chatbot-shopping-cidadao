'use strict'

import { Api, DateFNS, LocalStorage } from '../../helpers'

const INITIAL_STATE = {
  session: {
    _id: '',
    createdAt: '',
    expiration: '',
    id: ''
  },
  flow: {
    start: false
  }
}

export const Types = {
  SET_WATSON_FLOW_START: 'SET_WATSON_FLOW_START',
  SET_WATSON_SESSION_ID: 'SET_WATSON_SESSION_ID'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.SET_WATSON_FLOW_START:
      return { ...state, flow: { ...state.flow, ...payload } }
    case Types.SET_WATSON_SESSION_ID:
      return { ...state, session: { ...state.session, ...payload } }
    default:
      return state
  }
}

export function setWatsonFlowStart (start) {
  return {
    type: Types.SET_WATSON_FLOW_START,
    payload: {
      start
    }
  }
}

export function setWatsonSessionId () {
  return async (dispatch, getState) => {
    // const watsonLS = JSON.parse(LocalStorage.Get('watson'))
    // const watsonState = getState(state => state.watson)

    let session = ''
    // let sessionValid = false

    // if (watsonLS && DateFNS.compare(watsonLS.expiration, DateFNS.current) === 1) sessionValid = true

    // if (sessionValid) {
    //   session = watsonState.session ? watsonState.session : watsonLS.session
    // } else {
    const { data } = await Api.get('/watson/session')
    LocalStorage.Set('watson', JSON.stringify({ expiration: DateFNS.expiration, session: data }))
    session = data
    // }

    dispatch({
      type: Types.SET_WATSON_SESSION_ID,
      payload: {
        _id: session._id,
        id: session.watsonId,
        createdAt: DateFNS.current,
        expiration: DateFNS.expiration
      }
    })
  }
}
