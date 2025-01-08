import { FastifyInstance } from 'fastify'

import { authenticate } from './controller/authenticate'
import { profile } from './controller/profile'
import { register } from './controller/register'
import { verifyJwt } from './middleware/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
