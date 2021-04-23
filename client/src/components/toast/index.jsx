'use strict'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setActive } from '../../store/ducks/chatbot'

import Logo from '../../images/logo.svg'

import { Container } from './style'

const Toast = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const { config } = useSelector(({ chatbot }) => chatbot)

  const handleChat = () => dispatch(setActive(!config.active))

  useEffect(() => {
    setVisible(config.active)
  }, [config])

  return (
    <Container onClick={handleChat} active={visible}>
      <Logo />
    </Container>
  )
}

export default Toast
