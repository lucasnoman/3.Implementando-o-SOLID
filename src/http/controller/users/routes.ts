import { FastifyTypedInstances } from '@/@types/fastify-swagger'
import { verifyJwt } from '@/http/middleware/verify-jwt'

import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'
import {
  authenticateBodySchema,
  authenticateErrorResponseSchema,
  authenticateResponseSchema,
} from './schemas/authenticate-schema'
import { userProfileResponseSchema } from './schemas/profile-schema'
import { refreshResponseSchema } from './schemas/refresh-schema'
import {
  registerBodySchema,
  registerResponseSchema,
} from './schemas/register-schema'

export async function usersRoutes(app: FastifyTypedInstances) {
  app.post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        description: 'Register a new user',
        body: registerBodySchema,
        response: { 201: registerResponseSchema },
      },
    },
    register,
  )

  app.post(
    '/sessions',
    {
      schema: {
        tags: ['Users'],
        description: 'Authenticate user',
        body: authenticateBodySchema,
        response: {
          200: authenticateResponseSchema,
          400: authenticateErrorResponseSchema,
        },
      },
    },
    authenticate,
  )

  app.patch(
    '/token/refresh',
    {
      schema: {
        tags: ['Users'],
        description: 'Refresh user token',
        response: { 200: refreshResponseSchema },
      },
    },
    refresh,
  )

  /** Authenticated */
  app.get(
    '/me',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Users'],
        description: 'Get the current user profile',
        response: { 200: userProfileResponseSchema },
      },
    },
    profile,
  )
}
