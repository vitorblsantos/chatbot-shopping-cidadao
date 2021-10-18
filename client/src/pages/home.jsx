import React from 'react'

import Chat from '../components/chat'
import Outside from '../components/outside'
import Toast from '../components/toast'

const Home = () => {
  return (
    <Outside>
      <Chat />
      <Toast />
    </Outside>
  )
}

export default Home
