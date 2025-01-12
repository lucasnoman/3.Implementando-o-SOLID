import { z } from 'zod'

export const createCheckInParamsSchema = z.object({
  gymId: z.string().uuid(),
})

export const createCheckInBodySchema = z.object({
  latitude: z.number().refine((value) => Math.abs(value) <= 90),
  longitude: z.number().refine((value) => Math.abs(value) <= 180),
})

export const createCheckInResponseSchema = z.null()
