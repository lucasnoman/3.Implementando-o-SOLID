import { z } from 'zod'

export const refreshResponseSchema = z.object({ token: z.string() })
