'use strict'

import React from 'react'
import { useSelector } from 'react-redux'
import { array } from 'prop-types'

import { Container } from './style'

const Outside = ({ children }) => {
  const { active } = useSelector(({ chatbot }) => chatbot)

  return (
    <Container {...{ active }}>
      {children}
    </Container>
  )
}

Outside.propTypes = {
  children: array
}

export default Outside
