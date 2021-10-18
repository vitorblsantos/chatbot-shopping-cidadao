import { Api } from '../../helpers'

const INITIAL_STATE = [{}]

export const Types = {
  SET_STATIONS: 'SET_STATIONS'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.SET_STATIONS:
      return payload.data
    default:
      return state
  }
}

export function getStations () {
  return async (dispatch, getState) => {
    const { data } = await Api.get('/data/stations')
    return dispatch({
      type: Types.SET_STATIONS,
      payload: {
        data: data
      }
    })
  }
}
