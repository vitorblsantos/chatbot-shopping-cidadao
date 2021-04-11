'use strict'

import React from 'react'
import { Container, Content, IconBot, IconUser, MessageBot, MessageUser } from './style'

const Body = () => (
  <Container>
    <MessageBot>
      <IconBot />
      <Content>
        teste
      </Content>
    </MessageBot>
    <MessageUser>
      <Content>
        teste
      </Content>
      <IconUser />
    </MessageUser>
  </Container>
)

export default Body
