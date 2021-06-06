'use strict'

const INITIAL_STATE = {
  interactions: 0
}

export const Types = {
  ADD_USER_INTERACTION: 'ADD_USER_INTERACTION'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case Types.ADD_USER_INTERACTION:
    return { ...state, ...payload }
  default :
    return state
  }
}

export function addUserInteraction (interactions) {
  interactions = interactions += 1
  return {
    type: Types.ADD_USER_INTERACTION,
    payload: {
      interactions
    }
  }
}
