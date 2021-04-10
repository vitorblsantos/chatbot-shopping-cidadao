import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Base from '../components/_base'
import Home from '../components/home'

const Routes = () => {
  const history = createBrowserHistory({ forceRefresh: true })
  return (
    <Router {...{ history }}>
      <Switch>
        <Route component={Home} exact path='/' />
        <Route component={Base} exact path='/base' />
      </Switch>
    </Router>
  )
}

export default Routes
