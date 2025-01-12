import { FastifyReply, FastifyRequest } from 'fastify'

import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

import { searchGymQuerySchema } from './schemas/search-schema'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { query, page } = searchGymQuerySchema.parse(request.query)

  const searchGymUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymUseCase.execute({
    query,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
