import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeValidateCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  return new ValidateCheckInUseCase(checkInsRepository)
}
