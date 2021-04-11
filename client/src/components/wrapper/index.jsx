import React from 'react'
import { array } from 'prop-types'
import { Container, Outside } from './style'

const Wrapper = ({ children }) => (
  <Outside>
    <Container>
      {children}
    </Container>
  </Outside>
)

Wrapper.propTypes = {
  children: array
}

export default Wrapper
