'use strict'

import React from 'react'
import { Bot, Container, Icon, NoWrap, Row } from './style'

const Loader = () => (
  <Row>
    <NoWrap>
      <Icon>
        <Bot />
      </Icon>
      <Container>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Container>
    </NoWrap>
  </Row>
)

export default Loader
