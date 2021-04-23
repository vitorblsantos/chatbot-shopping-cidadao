'use strict'

import React from 'react'
import { element } from 'prop-types'

import { Container } from './style'

const Outside = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

Outside.propTypes = {
  children: element
}

export default Outside
