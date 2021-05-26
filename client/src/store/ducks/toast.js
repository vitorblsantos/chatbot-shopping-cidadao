'use strict'

const INITIAL_STATE = {
  active: true
}

export const Types = {
  SET_TOAST_ACTIVE: 'SET_TOAST_ACTIVE'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case Types.SET_TOAST_ACTIVE:
    return { ...state, active: payload.active }
  default:
    return state
  }
}

export function setToastActive (active) {
  return {
    type: Types.SET_TOAST_ACTIVE,
    payload: {
      active
    }
  }
}
