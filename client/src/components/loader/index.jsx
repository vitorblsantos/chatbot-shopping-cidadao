'use strict'

import React from 'react'
import { Bot, Container, Icon, NoWrap, Wrap } from './style'

const Loader = () => (
  <Wrap>
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
  </Wrap>
)

export default Loader
