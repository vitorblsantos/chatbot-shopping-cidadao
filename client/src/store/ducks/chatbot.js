'use strict'

const INITIAL_STATE = {
  active: false,
  loader: {
    active: true,
    timer: 2000
  },
  messages: [],
  options: []
}

export const Types = {
  SET_CHAT_ACTIVE: 'SET_CHAT_ACTIVE',
  SET_CHAT_LOADER_ACTIVE: 'SET_CHAT_LOADER_ACTIVE',
  SET_MESSAGES: 'SET_MESSAGES',
  SET_OPTIONS: 'SET_OPTIONS'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case Types.SET_CHAT_ACTIVE:
    return { ...state, ...payload }
  case Types.SET_CHAT_LOADER_ACTIVE :
    return { ...state, loader: { ...state.loader, ...payload } }
  case Types.SET_MESSAGES:
    return { ...state, messages: [...state.messages, { ...payload }] }
  case Types.SET_OPTIONS:
    return { ...state, options: payload.options }
  default:
    return state
  }
}

export function setChatActive (active) {
  return {
    type: Types.SET_CHAT_ACTIVE,
    payload: {
      active
    }
  }
}

export function setChatLoaderActive (active) {
  return {
    type: Types.SET_CHAT_LOADER_ACTIVE,
    payload: {
      active
    }
  }
}

export function setMessages (sender, content) {
  return {
    type: Types.SET_MESSAGES,
    payload: {
      content,
      sender
    }
  }
}

export function setOptions (options) {
  return {
    type: Types.SET_OPTIONS,
    payload: {
      options
    }
  }
}
