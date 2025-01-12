import { z } from 'zod'

export const metricsResponseSchema = z.object({
  checkInsCount: z.number(),
})
