'use strict'

import { createStore, combineReducers } from 'redux'

import { chatbot } from './ducks'

const reducer = combineReducers({
  chatbot
})

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
