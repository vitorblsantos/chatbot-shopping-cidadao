'use strict'

const INITIAL_STATE = {
  active: false,
  loader: true,
  messages: []
}

export const Types = {
  SET_CHAT_ACTIVE: 'SET_CHAT_ACTIVE',
  SET_CHAT_LOADER: 'SET_CHAT_LOADER',
  SET_MESSAGES: 'SET_MESSAGES'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case Types.SET_CHAT_ACTIVE:
    return { ...state, ...payload }
  case Types.SET_CHAT_LOADER :
    return { ...state, ...payload }
  case Types.SET_MESSAGES:
    return { ...state, messages: [...state.messages, { ...payload }] }
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

export function setMessages (sender, content) {
  return {
    type: Types.SET_MESSAGES,
    payload: {
      content,
      sender
    }
  }
}
