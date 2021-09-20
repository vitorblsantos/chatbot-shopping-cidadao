import React from 'react'
import { sanitize } from 'dompurify'
import { array, object, string } from 'prop-types'

import { Balloon, Hour, Icon, Image, Row } from './style'

const Bot = ({ content, time }) => {
  const sanitizer = sanitize
  return (
    <Row>
      <Icon>
        <Image />
      </Icon>
      <Balloon>
        <span dangerouslySetInnerHTML={{ __html: sanitizer(content.text) }} />
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
