'use strict'

import React from 'react'
import { array, bool } from 'prop-types'

import { BalloonBot, Content, Icon, Image, Option, Options, Row } from './style'

import Loader from '../loader'

const Bot = ({ loading, options }) => {
  if (loading) return <Loader />
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
