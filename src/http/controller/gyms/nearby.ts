import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

import { nearbyGymQuerySchema } from './schemas/nearby-schema'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const { latitude, longitude } = nearbyGymQuerySchema.parse(request.query)

  const fetchNearbyGymUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymUseCase.execute({
    userLongitude: longitude,
    userLatitude: latitude,
  })

  return reply.status(200).send({ gyms })
}
