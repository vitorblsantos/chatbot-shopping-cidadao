'use strict'

const INITIAL_STATE = {
  interactions: []
}

export const Types = {
  SET_USER_INTERACTION: 'SET_USER_INTERACTION'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case Types.SET_USER_INTERACTION:
    return { ...state, interactions: [...state.interactions, { ...payload }] }
  default:
    return state
  }
}

export const setUserInteraction = (description, origin, param) => {
  return (dispatch) => {
    dispatch({
      type: Types.SET_USER_INTERACTION,
      payload: {
        description,
        origin,
        ...param
      }
    })
  }
}
