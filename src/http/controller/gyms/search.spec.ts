import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'The Gym',
        description: 'This is a Gym',
        phone: '33999995874',
        latitude: -17.6801064,
        longitude: -42.5216598,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'The Gym 2',
        description: 'This is a Gym too',
        phone: '33999995874',
        latitude: -17.6801064,
        longitude: -42.5216598,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ query: 'The Gym 2' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'The Gym 2',
      }),
    ])
  })
})
