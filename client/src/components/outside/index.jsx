'use strict'

import React from 'react'
import { node } from 'prop-types'

import { Container, Relative } from './style'

const Outside = ({ children }) => {
  return (
    <Container>
      <Relative>
        {children}
      </Relative>
    </Container>
  )
}

Outside.propTypes = {
  children: node
}

export default Outside
