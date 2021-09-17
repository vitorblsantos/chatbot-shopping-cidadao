'use strict'

import React, { useEffect, useState } from 'react'

import { Api } from '../../helpers'

const Base = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    (async _ => {
      const { data, status } = await Api.get()
      if (status !== 200) return false
      return setMessage(data.message)
    })()
  }, [])

  return <h1>{message}</h1>
}

export default Base
