'use strict'

import React from 'react'
import { mount } from 'enzyme'

import App from '../../client/src/App.jsx'
import Base from '../../client/src/components/_base.jsx'

describe('Client', () => {
  it('Should render _base', done => {
    const wrapper = mount(<App />)
    expect(wrapper.find(Base).length).toBe(1)
  })
})
