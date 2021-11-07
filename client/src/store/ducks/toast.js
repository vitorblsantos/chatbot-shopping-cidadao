const INITIAL_STATE = {
  active: true,
  message: {
    active: false
  }
}

export const Types = {
  RESTART_TOAST: 'RESTART_TOAST',
  SET_TOAST_ACTIVE: 'SET_TOAST_ACTIVE',
  SET_TOAST_MESSAGE_ACTIVE: 'SET_TOAST_MESSAGE_ACTIVE'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  if (type === Types.RESTART_TOAST) return { ...INITIAL_STATE }
  if (type === Types.SET_TOAST_ACTIVE) return { ...state, ...payload }
  if (type === Types.SET_TOAST_MESSAGE_ACTIVE) return { ...state, message: { ...state.message, ...payload } }
  return state
}

export function restartToast () {
  return {
    type: Types.RESTART_TOAST
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

export function setToastMessageActive (active) {
  return {
    type: Types.SET_TOAST_MESSAGE_ACTIVE,
    payload: {
      active
    }
  }
}
