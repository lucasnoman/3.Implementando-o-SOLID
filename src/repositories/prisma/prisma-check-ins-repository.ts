import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import { prisma } from '@/lib/prisma'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return prisma.checkIn.create({
      data,
    })
  }

  async save(data: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    return await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })
  }

  async findManyByUserId(userId: string, page: number) {
    return await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * 20,
      take: 20,
    })
  }

  async findById(id: string) {
    return await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
  }

  async countByUserId(userId: string) {
    return await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })
  }
}
