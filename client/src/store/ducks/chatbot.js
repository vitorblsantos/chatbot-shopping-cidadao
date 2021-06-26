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
  ADD_OPTIONS: 'ADD_OPTIONS',
  SET_CHAT_ACTIVE: 'SET_CHAT_ACTIVE',
  SET_CHAT_LOADER_ACTIVE: 'SET_CHAT_LOADER_ACTIVE',
  SET_MESSAGES: 'SET_MESSAGES'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case Types.ADD_OPTIONS:
    return { ...state, options: payload.options }
  case Types.SET_CHAT_ACTIVE:
    return { ...state, ...payload }
  case Types.SET_CHAT_LOADER_ACTIVE :
    return { ...state, loader: { ...state.loader, ...payload } }
  case Types.SET_MESSAGES:
    return { ...state, messages: [...state.messages, { ...payload }] }
  default:
    return state
  }
}

export function addOptions (options) {
  return {
    type: Types.ADD_OPTIONS,
    payload: {
      options
    }
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
