import { FastifyTypedInstances } from '@/@types/fastify-swagger'
import { verifyJwt } from '@/http/middleware/verify-jwt'
import { verifyUserRole } from '@/http/middleware/verify-user-role'

import { create } from './create'
import { nearby } from './nearby'
import {
  createGymBodySchema,
  createGymResponseSchema,
} from './schemas/create-schema'
import { nearbyGymQuerySchema } from './schemas/nearby-schema'
import {
  searchGymQuerySchema,
  searchGymResponseSchema,
} from './schemas/search-schema'
import { search } from './search'

export async function gymsRoutes(app: FastifyTypedInstances) {
  // Todas as rotas abaixo desse addHook chamarão o middleware que verifica autenticação
  app.addHook('onRequest', verifyJwt)

  app.get(
    '/gyms/search',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: {
        tags: ['Gyms'],
        description: 'Search for gyms',
        querystring: searchGymQuerySchema,
        response: { 200: searchGymResponseSchema },
      },
    },
    search,
  )
  app.get(
    '/gyms/nearby',
    {
      schema: {
        tags: ['Gyms'],
        description: 'Search for nearby gyms',
        querystring: nearbyGymQuerySchema,
        response: { 200: searchGymResponseSchema },
      },
    },
    nearby,
  )

  app.post(
    '/gyms',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: {
        tags: ['Gyms'],
        description: 'Register a new gym',
        body: createGymBodySchema,
        response: { 201: createGymResponseSchema },
      },
    },
    create,
  )
}
