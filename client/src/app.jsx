import React from 'react'

import Chat from './components/chat'
import Outside from './components/outside'
import Toast from './components/toast'

import './styles/main.scss'

const App = () => {
  return (
    <Outside>
      <Chat />
      <Toast />
    </Outside>
  )
}

export default App
