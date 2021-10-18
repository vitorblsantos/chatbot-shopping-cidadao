import React from 'react'
import { object } from 'prop-types'
import PageInactive from '../components/inactive'

const Inactive = ({ match }) => {
  return (
    <PageInactive {...match} />
  )
}

Inactive.propTypes = {
  match: object
}

export default Inactive
