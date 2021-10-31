import React from 'react'
import { string } from 'prop-types'

import { Balloon, Hour, Row } from './style'

const User = ({ content, time }) => (
  <Row>
    <Balloon>
      {content}
      <Hour>
        {time}
      </Hour>
    </Balloon>
  </Row>
)

User.propTypes = {
  content: string,
  time: string
}

export default User
