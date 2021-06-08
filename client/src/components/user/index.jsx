'use strict'

import React from 'react'
import { string } from 'prop-types'

import { Balloon, Row } from './style'

const User = ({ content }) => (
  <Row>
    <Balloon>
      {content}
    </Balloon>
  </Row>
)

User.propTypes = {
  content: string
}

export default User
