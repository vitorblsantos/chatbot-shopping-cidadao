import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Base from '../components/_base'
import Home from '../components/home'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/base' exact component={Base} />
  </Switch>
)

export default Routes
