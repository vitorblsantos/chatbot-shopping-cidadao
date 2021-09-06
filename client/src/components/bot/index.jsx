import React from 'react'
import { array, object, string } from 'prop-types'

import { Balloon, Hour, Icon, Image, Row } from './style'

const Bot = ({ content, time }) => {
  return (
    <Row>
      <Icon>
        <Image />
      </Icon>
      <Balloon>
        {content.text}
        <Hour>
          {time}
        </Hour>
      </Balloon>
    </Row>
  )
}

Bot.propTypes = {
  content: object,
  options: array,
  time: string
}

export default Bot
