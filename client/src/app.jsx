import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Active from './pages/active'
import Cancel from './pages/cancel'
import Home from './pages/home'

import './styles/main.scss'

const App = () => {
  return (
    <Router>
      <Route path='/' exact component={Home} />
      <Route path='/ativar/:id' component={Active} />
      <Route path='/inativar/:id' component={Cancel} />
    </Router>
  )
}

export default App
