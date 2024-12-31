import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { registerUseCase } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    await registerUseCase({ email, name, password })
  } catch (error) {
    return reply.status(400).send({ message: error })
  }

  return reply.status(201).send()
}
