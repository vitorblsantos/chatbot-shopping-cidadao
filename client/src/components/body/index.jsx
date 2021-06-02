'use strict'

import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { Sleep } from '../../helpers'

import Bot from '../bot'
import Loader from '../loader'
import Options from '../options'
import User from '../user'

import { Container } from './style'

const AlwaysScrollToBottom = () => {
  const elementRef = useRef()
  useEffect(() => elementRef.current.scrollIntoView({ behavior: 'smooth' }))
  return <div ref={elementRef} />
}

const Body = () => {
  const [scroll, setScroll] = useState(false)
  const { active, loader, messages } = useSelector(({ chatbot }) => chatbot)

  const handleScroll = async bool => {
    await Sleep(700)
    setScroll(bool)
  }

  useEffect(() => {
    handleScroll(active)
  }, [active])

  useEffect(() => {
    if (!messages.length) return () => false
  }, [messages])

  return (
    <Container>
      <Bot />
      <User />
      <Options />
      <User />
      {loader && <Loader />}
      {scroll && <AlwaysScrollToBottom />}
    </Container>
  )
}

export default Body
