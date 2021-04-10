'use strict'

import React from 'react'
import { Route } from 'react-router-dom'
import { shallow } from 'enzyme'

import Routes from '../../client/src/routes'

import Base from '../../client/src/components/_base'
import Home from '../../client/src/components/home'

let pathMap = {}

describe('Test client routes', () => {
  beforeAll(() => {
    jest.setTimeout(10000)
    const component = shallow(<Routes />)
    pathMap = component.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props()
      pathMap[routeProps.path] = routeProps.component
      return pathMap
    }, {})
  })

  it('Should render component home for route /', _ => {
    expect(pathMap['/']).toBe(Home)
  })

  it('Should render component _base for route /base', _ => {
    expect(pathMap['/base']).toBe(Base)
  })
})
