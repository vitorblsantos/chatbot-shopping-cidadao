'use strict'

import React from 'react'
import { string } from 'prop-types'

import { Balloon, Icon, Image, Row } from './style'

const Bot = ({ content }) => {
  return (
    <Row>
      <Icon>
        <Image />
      </Icon>
      <Balloon>
        {content}
      </Balloon>
    </Row>
  )
}

Bot.propTypes = {
  content: string
}

export default Bot
