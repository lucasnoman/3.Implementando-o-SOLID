import { z } from 'zod'

export const searchGymQuerySchema = z.object({
  query: z.string(),
  page: z.coerce.number().min(1).default(1),
})

export const searchGymResponseSchema = z.object({
  gyms: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      phone: z.string().nullable(),
      latitude: z.any(),
      longitude: z.any(),
    }),
  ),
})
