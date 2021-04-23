import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setActive } from '../../store/ducks/chatbot'

import { Button, Container } from './style'

const Header = () => {
  const dispatch = useDispatch()

  const { config } = useSelector(({ chatbot }) => chatbot)

  const handleChat = () => dispatch(setActive(!config.active))
  return (
    <Container>
      <Button onClick={handleChat}> + </Button>
    </Container>
  )
}

export default Header
