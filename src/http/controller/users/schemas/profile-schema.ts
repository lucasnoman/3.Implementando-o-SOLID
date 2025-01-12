import { z } from 'zod'

export const userProfileResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password_hash: z.undefined(),
    role: z.enum(['ADMIN', 'MEMBER']),
    created_at: z.date(),
  }),
})
