'use strict'

const INITIAL_STATE = {
  active: false,
  loader: true,
  messages: []
}

export const Types = {
  SET_CHAT_ACTIVE: 'SET_CHAT_ACTIVE',
  SET_CHAT_LOADER: 'SET_LOADING',
  SET_MESSAGES: 'SET_MESSAGES'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case Types.SET_CHAT_ACTIVE ||
    Types.SET_CHAT_LOADER ||
    Types.SET_MESSAGES:
    return { ...state, ...payload }
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

export function setChatLoader (loader) {
  return {
    type: Types.SET_CHAT_LOADER,
    payload: {
      loader
    }
  }
}

export function setMessages (messages) {
  return {
    type: Types.SET_MESSAGES,
    payload: {
      messages
    }
  }
}
