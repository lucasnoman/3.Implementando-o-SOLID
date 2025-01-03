import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Zé do teste',
      email: 'zedoteste@example.com',
      password: '1a2b3c4d',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
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
    const email = 'zedoteste@example.com'

    await sut.execute({
      name: 'Zé do teste',
      email,
      password: '1a2b3c4d',
    })

    await expect(() =>
      sut.execute({
        name: 'Zé do teste',
        email,
        password: '1a2b3c4d',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
