'use strict'

import React from 'react'
import { node } from 'prop-types'

import { Background, Container, Relative } from './style'

const Outside = ({ children }) => {
  return (
    <>
      <Background />
      <Container>
        <Relative>
          {children}
        </Relative>
      </Container>
    </>
  )
}

Outside.propTypes = {
  children: node
}

export default Outside
