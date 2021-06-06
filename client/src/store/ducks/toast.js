'use strict'

import { Sleep } from '../../helpers'

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
    return { ...state, ...payload }

  default:
    return state
  }
}

export function handleMessage () {
  return async (dispatch, getState) => {
    await Sleep(8000)
    const { user } = getState()

    if (user.interactions > 0) return false

    dispatch({
      type: Types.SET_TOAST_MESSAGE_ACTIVE,
      payload: {
        message: {
          active: true
        }
      }
    })

    await Sleep(8000)
    dispatch({
      type: Types.SET_TOAST_MESSAGE_ACTIVE,
      payload: {
        message: {
          active: false
        }
      }
    })
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
