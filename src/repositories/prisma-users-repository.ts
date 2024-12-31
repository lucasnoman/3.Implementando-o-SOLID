import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    return userWithSameEmail
  }
}
