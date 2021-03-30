import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Routes from './routes'

const App = () => {
  const history = createBrowserHistory({ forceRefresh: true })
  return (
    <Router {...{ history }}>
      <Routes />
    </Router>
  )
}

export default App
