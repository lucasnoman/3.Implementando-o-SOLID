import { FastifyReply, FastifyRequest } from 'fastify'

import { makeValidateCheckInsUseCase } from '@/use-cases/factories/make-validate-check-ins-use-case'

import { validateCheckInParamsSchema } from './schemas/validate-schema'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInsUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
