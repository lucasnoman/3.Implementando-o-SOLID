import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middleware/verify-jwt'

import { create } from './create'
import { nearby } from './nearby'
import { search } from './search'

export async function gymsRoutes(app: FastifyInstance) {
  // Todas as rotas abaixo desse addHook chamarão o middleware que verifica autenticação
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}
