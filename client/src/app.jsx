import React from 'react'
import Body from './components/body'
import Header from './components/header'
import Footer from './components/footer'
import Wrapper from './components/wrapper'

import './styles/main.scss'

const App = () => {
  return (
    <Wrapper>
      <Header />
      <Body />
      <Footer />
    </Wrapper>
  )
}

export default App
