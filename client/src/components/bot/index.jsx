'use strict'

import React from 'react'
import { object } from 'prop-types'

import { Balloon, Icon, Image, Row } from './style'

const Bot = ({ content }) => {
  return (
    <Row>
      <Icon>
        <Image />
      </Icon>
      <Balloon>
        {content.text}
      </Balloon>
    </Row>
  )
}

Bot.propTypes = {
  content: object
}

export default Bot
