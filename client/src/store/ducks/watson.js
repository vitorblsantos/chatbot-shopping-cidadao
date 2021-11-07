import { Api, DateFNS } from '../../helpers'

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
  RESTART_WATSON: 'RESTART_WATSON',
  SET_WATSON_FLOW_START: 'SET_WATSON_FLOW_START',
  SET_WATSON_SESSION_ID: 'SET_WATSON_SESSION_ID'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  if (type === Types.RESTART_WATSON) return { ...INITIAL_STATE }
  if (type === Types.SET_WATSON_FLOW_START) return { ...state, flow: { ...state.flow, ...payload } }
  if (type === Types.SET_WATSON_SESSION_ID) return { ...state, session: { ...state.session, ...payload } }
  return state
}

export function restartWatson () {
  return {
    type: Types.RESTART_WATSON
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
    const { data } = await Api.get('/watson/session')

    dispatch({
      type: Types.SET_WATSON_SESSION_ID,
      payload: {
        _id: data.id,
        id: data.watsonId,
        createdAt: DateFNS.current,
        expiration: DateFNS.expiration
      }
    })
  }
}
