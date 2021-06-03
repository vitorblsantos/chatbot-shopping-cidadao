'use strict'

import React from 'react'

import { Balloon, Content, Icon, Image, Row } from './style'

const Bot = () => {
  return (
    <Row>
      <Content>
        <Icon>
          <Image />
        </Icon>
        <Balloon>
          Ola
        </Balloon>
      </Content>
    </Row>
  )
}

export default Bot
