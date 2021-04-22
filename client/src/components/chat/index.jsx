import React from 'react'
import { array } from 'prop-types'
import { Container, Outside } from './style'

const Chat = ({ children }) => (
  <Outside>
    <Container>
      {children}
    </Container>
  </Outside>
)

Chat.propTypes = {
  children: array
}

export default Chat
