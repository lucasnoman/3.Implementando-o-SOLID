import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Zé do teste',
      email: 'zedoteste@example.com',
      password: '1a2b3c4d',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

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

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'zedoteste@example.com'

    await registerUseCase.execute({
      name: 'Zé do teste',
      email,
      password: '1a2b3c4d',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'Zé do teste',
        email,
        password: '1a2b3c4d',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
