import { hash } from 'bcryptjs'

import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  email,
  name,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

    const prismaUsersRepository = new PrismaUsersRepository()

    const userWithSameEmail = await prismaUsersRepository.findByEmail(email)

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  })
}
