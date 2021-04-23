'use strict'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Messages } from './style'

import Bot from '../bot'
import Loader from '../loader'
import Options from '../options'
import User from '../user'

const Body = () => {
  const [loading, setLoading] = useState(false)
  const { config } = useSelector(({ chatbot }) => chatbot)

  useEffect(() => {
    setLoading(config.loading)
  }, [config])

  return (
    <Messages>
      <Bot />
      <User />
      <Options />
      <User />
      {loading && <Loader />}
    </Messages>
  )
}

export default Body
