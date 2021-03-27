'use strict'

import Supertest from 'supertest'

import App from '../../server/app'

describe('Start Server', () => {
  const request = Supertest(App)

  afterAll(done => App.close(done))

  it('Get default endpoint - /api', async done => {
    const { body, status } = await request.get('/api')
    expect(status).toEqual(200)
    expect(body.message).toBe('Boilerplate React Node')
    done()
  })
})
