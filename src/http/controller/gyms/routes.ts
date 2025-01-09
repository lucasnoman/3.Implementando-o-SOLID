import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middleware/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  // Todas as rotas abaixo desse addHook chamarão o middleware que verifica autenticação
  app.addHook('onRequest', verifyJwt)
}
