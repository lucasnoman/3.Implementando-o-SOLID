import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

import { createGymBodySchema } from './schemas/create-schema'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { latitude, longitude, phone, description, title } =
    createGymBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.execute({
    latitude,
    longitude,
    phone,
    description,
    title,
  })

  return reply.status(201).send()
}
