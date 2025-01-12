import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

import {
  createCheckInBodySchema,
  createCheckInParamsSchema,
} from './schemas/create-schema'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)
  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLongitude: longitude,
    userLatitude: latitude,
  })

  return reply.status(201).send()
}
