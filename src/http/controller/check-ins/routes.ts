import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middleware/verify-jwt'
import { verifyUserRole } from '@/http/middleware/verify-user-role'

import { create } from './create'
import { history } from './history'
import { metrics } from './metrics'
import {
  createCheckInBodySchema,
  createCheckInParamsSchema,
  createCheckInResponseSchema,
} from './schemas/create-schema'
import {
  checkInHistoryQuerySchema,
  nearbyGymResponseSchema,
} from './schemas/history-schema'
import { metricsResponseSchema } from './schemas/metrics-schema'
import {
  validateCheckInParamsSchema,
  validateCheckInResponseSchema,
} from './schemas/validate-schema'
import { validate } from './validate'

export async function checkInsRoutes(app: FastifyInstance) {
  // Todas as rotas abaixo desse addHook chamarão o middleware que verifica autenticação
  app.addHook('onRequest', verifyJwt)

  app.get(
    '/check-ins/history',
    {
      schema: {
        tags: ['Check-in'],
        description: 'Get user history of check-ins',
        querystring: checkInHistoryQuerySchema,
        response: { 200: nearbyGymResponseSchema },
      },
    },
    history,
  )

  app.get(
    '/check-ins/metrics',
    {
      schema: {
        tags: ['Check-in'],
        description: 'Get user check-in metrics',
        response: { 200: metricsResponseSchema },
      },
    },
    metrics,
  )

  app.post(
    '/gyms/:gymId/check-ins',
    {
      schema: {
        tags: ['Check-in'],
        description: 'Creates user check-ins in specific gym',
        params: createCheckInParamsSchema,
        body: createCheckInBodySchema,
        response: { 201: createCheckInResponseSchema },
      },
    },
    create,
  )

  app.patch(
    '/check-ins/:checkInId/validate',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: {
        tags: ['Check-in'],
        description: 'Validate user check-in',
        params: validateCheckInParamsSchema,
        response: { 204: validateCheckInResponseSchema },
      },
    },
    validate,
  )
}
