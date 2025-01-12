import { z } from 'zod'

export const checkInHistoryQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
})

export const nearbyGymResponseSchema = z.object({
  checkIns: z.array(
    z.object({
      id: z.string(),
      created_at: z.date(),
      validated_at: z.date().nullable(),
      user_id: z.string(),
      gym_id: z.string(),
    }),
  ),
})
