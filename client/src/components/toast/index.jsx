'use strict'

import React from 'react'
import { bool } from 'prop-types'
import { Container } from './style'

import Logo from '../../images/logo.svg'

const Toast = ({ active }) => (
  <Container {...{ active }}>
    <Logo />
  </Container>
)

Toast.propTypes = {
  active: bool
}

export default Toast
