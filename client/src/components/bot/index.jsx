'use strict'

import React from 'react'
import { useSelector } from 'react-redux'
import { array, bool } from 'prop-types'

import { BalloonBot, Content, Icon, Image, Option, Options, Row } from './style'

const Bot = ({ loading, options }) => {
  return (
    <Row>
      <Content>
        <Icon>
          <Image />
        </Icon>
        <BalloonBot>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </BalloonBot>
      </Content>
      {
        options && (
          <Options>
            {
              options.map(({ value }, i) => (
                <Option key={i}>
                  {value.input.text}
                </Option>
              ))
            }
          </Options>
        )
      }
    </Row>
  )
}

Bot.propTypes = {
  loading: bool,
  options: array
}

export default Bot
