import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './src/app.jsx'
import store from './src/store'

render(<Provider {...{ store }}><App /></Provider>, document.getElementById('app'))
