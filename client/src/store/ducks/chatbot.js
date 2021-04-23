'use strict'

const INITIAL_STATE = {
  config: {
    active: false,
    loading: true
  },
  messages: []
}

export const Types = {
  SET_ACTIVE: 'SET_ACTIVE',
  SET_LOADING: 'SET_LOADING',
  SET_MESSAGE: 'SET_MESSAGE'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case Types.SET_ACTIVE:
    return {
      ...state,
      config: {
        ...state.config,
        active: payload.active
      }
    }

  case Types.SET_LOADING:
    return {
      ...state,
      config: {
        ...state.config,
        loading: payload.loading
      }
    }

  case Types.SET_MESSAGE:
    return {
      ...state,
      messages: [
        ...state.messages,
        payload.messages
      ]
    }

  default:
    return state
  }
}

export function setActive (active) {
  return {
    type: Types.SET_ACTIVE,
    payload: {
      active
    }
  }
}

export function setLoading (loading) {
  return {
    type: Types.SET_LOADING,
    payload: {
      loading
    }
  }
}

export function setMessage (messages) {
  return {
    type: Types.SET_MESSAGE,
    payload: {
      messages
    }
  }
}
