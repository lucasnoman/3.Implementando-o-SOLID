import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Fulano',
      email: 'fulano@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      password: '123456',
      email: 'fulano@example.com',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() =>
      sut.execute({
        password: '123456',
        email: 'fulano@example.com',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Fulano',
      email: 'fulano@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        password: '123455',
        email: 'fulano@example.com',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
