'use strict'

import { createStore, combineReducers } from 'redux'

import { chatbot, toast } from './ducks'

const reducer = combineReducers({
  chatbot,
  toast
})

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
