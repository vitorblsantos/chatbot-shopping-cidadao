import React from 'react'

import Body from './components/body'
import Chat from './components/chat'
import Footer from './components/footer'
import Header from './components/header'
import Toast from './components/toast'

import './styles/main.scss'

const App = () => {
  return (
    <>
      <Chat>
        <Header />
        <Body />
        <Footer />
      </Chat>
      <Toast />
    </>
  )
}

export default App
