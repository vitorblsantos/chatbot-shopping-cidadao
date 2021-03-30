import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Base from '../components/_base'
import Home from '../components/home'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={Base} />
    <Route path='/home' exact component={Home} />
  </Switch>
)

export default Routes
