'use strict'

const INITIAL_STATE = {
  config: {
    active: false,
    loading: false
  }
}

export const Types = {
  SET_LOADING: 'SET_LOADING',
  SET_ACTIVE: 'SET_ACTIVE'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case Types.SET_ACTIVE:
    state = { ...state, 'config.active': payload.loading }
    return state
  case Types.SET_LOADING:
    state = { ...state, 'config.loading': payload.loading }
    return state
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
