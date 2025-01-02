import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

import { RegisterUseCase } from '@/use-cases/register'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail() {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'Zé do teste',
      email: 'zedoteste@example.com',
      password: '1a2b3c4d',
    })

    const isPasswordCorrectlyHashed = await compare(
      '1a2b3c4d',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
