const INITIAL_STATE = {
  active: false,
  context: {
    date: '',
    email: '',
    findSchedules: '',
    finishedSchedule: '',
    firstInteraction: '',
    getDate: '',
    getEmail: '',
    getIdentifier: '',
    getLocation: '',
    getName: '',
    getSchedules: '',
    getService: '',
    location: '',
    name: '',
    schedulesIdentifier: '',
    service: '',
    useLastScheduleData: '',
    userData: '',
    userId: ''
  },
  input: {
    disabled: false,
    placeholder: '',
    warning: false
  },
  loader: {
    active: true,
    timer: 1500
  },
  messages: [],
  options: []
}

export const Types = {
  SET_CHAT_ACTIVE: 'SET_CHAT_ACTIVE',
  SET_CHAT_CONTEXT: 'SET_CHAT_CONTEXT',
  SET_CHAT_INPUT_DISABLED: 'SET_CHAT_INPUT_DISABLED',
  SET_CHAT_INPUT_PLACEHOLDER: 'SET_CHAT_INPUT_PLACEHOLDER',
  SET_CHAT_INPUT_WARNING: 'SET_CHAT_INPUT_WARNING',
  SET_CHAT_LOADER_ACTIVE: 'SET_CHAT_LOADER_ACTIVE',
  SET_MESSAGES: 'SET_MESSAGES',
  SET_OPTIONS: 'SET_OPTIONS'
}

export default function reducer (state = INITIAL_STATE, { type, payload }) {
  if (type === Types.SET_CHAT_ACTIVE) return { ...state, ...payload }
  if (type === Types.SET_CHAT_CONTEXT) return { ...state, context: { ...state.context, ...payload } }
  if (type === Types.SET_CHAT_INPUT_DISABLED) return { ...state, input: { ...state.input, ...payload } }
  if (type === Types.SET_CHAT_INPUT_PLACEHOLDER) return { ...state, input: { ...state.input, ...payload } }
  if (type === Types.SET_CHAT_INPUT_WARNING) return { ...state, input: { ...state.input, ...payload } }
  if (type === Types.SET_CHAT_LOADER_ACTIVE) return { ...state, loader: { ...state.loader, ...payload } }
  if (type === Types.SET_MESSAGES) return { ...state, messages: [...state.messages, { ...payload }] }
  if (type === Types.SET_OPTIONS) return { ...state, options: payload.options }
  return state
}

export function setChatActive (active) {
  return {
    type: Types.SET_CHAT_ACTIVE,
    payload: {
      active
    }
  }
}

export function setChatContext (context) {
  return (dispatch, _) => {
    dispatch({
      type: Types.SET_CHAT_CONTEXT,
      payload: {
        ...context
      }
    })
  }
}

export function setChatInputDisabled (disabled) {
  return (dispatch, _) => {
    dispatch({
      type: Types.SET_CHAT_INPUT_DISABLED,
      payload: {
        disabled
      }
    })
  }
}

export function setChatInputPlaceholder (placeholder) {
  return (dispatch, _) => {
    dispatch({
      type: Types.SET_CHAT_INPUT_PLACEHOLDER,
      payload: {
        placeholder
      }
    })
  }
}

export function setChatInputWarning (warning) {
  return (dispatch, _) => {
    dispatch({
      type: Types.SET_CHAT_INPUT_WARNING,
      payload: {
        warning
      }
    })
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

export function setMessages ({ content, context, sender, time }) {
  return (dispatch, getState) => {
    dispatch({
      type: Types.SET_MESSAGES,
      payload: {
        content,
        context,
        sender,
        time
      }
    })
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
