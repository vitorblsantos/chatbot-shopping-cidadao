'use strict'

import React from 'react'
import { Messages } from './style'

import Bot from '../bot'
import User from '../user'

const loading = 1

const options = [
  {
    label: 'option 1',
    value: {
      input: {
        text: 'Agendamento RG'
      }
    }
  }, {
    label: 'option 1',
    value: {
      input: {
        text: 'Agendamento RG'
      }
    }
  }, {
    label: 'option 1',
    value: {
      input: {
        text: 'Agendamento RG'
      }
    }
  }
]

const Body = () => (
  <Messages>
    <Bot {...{ loading: false, options }} />
    <User />
    <Bot {...{ loading: true, options }} />
  </Messages>
)

export default Body
