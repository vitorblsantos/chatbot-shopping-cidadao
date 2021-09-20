import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Active from './pages/active'
import Cancel from './pages/cancel'
import Home from './pages/home'

import './styles/main.scss'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/ativar/:id' component={Active} />
        <Route exact path='/inativar/:id' component={Cancel} />
      </Switch>
    </Router>
  )
}

export default App
