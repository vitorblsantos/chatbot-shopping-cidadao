'use strict'

const INITIAL_STATE = {
  active: true,
  message: {
    active: false
  }
}

export const Types = {
  SET_TOAST_ACTIVE: 'SET_TOAST_ACTIVE',
  SET_TOAST_MESSAGE_ACTIVE: 'SET_TOAST_MESSAGE_ACTIVE'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case Types.SET_TOAST_ACTIVE:
    return { ...state, ...payload }
  case Types.SET_TOAST_MESSAGE_ACTIVE:
    return { ...state, message: { ...state.message, ...payload } }

  default:
    return state
  }
}

export function setToast (active) {
  return {
    type: Types.SET_TOAST_ACTIVE,
    payload: {
      active
    }
  }
}

export function setToastMessage (active) {
  return {
    type: Types.SET_TOAST_MESSAGE_ACTIVE,
    payload: {
      active
    }
  }
}
