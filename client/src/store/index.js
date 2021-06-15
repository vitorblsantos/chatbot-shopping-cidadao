'use strict'

import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import { chatbot, toast, user, watson } from './ducks'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
  chatbot,
  toast,
  user,
  watson
})

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))

export default store
