import React from 'react'
import { object } from 'prop-types'
import PageActive from '../components/active'

const Active = ({ match }) => {
  return (
    <PageActive {...match} />
  )
}

Active.propTypes = {
  match: object
}

export default Active
