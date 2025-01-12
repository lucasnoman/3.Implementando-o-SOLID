import { z } from 'zod'

export const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const authenticateResponseSchema = z.object({ token: z.string() })

export const authenticateErrorResponseSchema = z.object({ message: z.string() })
