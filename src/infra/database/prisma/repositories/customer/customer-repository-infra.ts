import { PrismaHelper } from '@/infra/database/prisma/helpers/prisma-helper';
import type {
  CustomerRepositoryContractsUsecase,
  CustomerRepositoryDto,
} from '@/usecases/contracts/database';
import type { PrismaClient } from '@prisma/client';

export class CustomerRepository implements CustomerRepositoryContractsUsecase {
  private async client(): Promise<PrismaClient> {
    return await PrismaHelper.getPrisma();
  }

  async findFieldOrNull<K extends keyof CustomerRepositoryDto>(
    field: K,
    value: CustomerRepositoryDto[K],
  ): Promise<CustomerRepositoryDto | null> {
    const prisma = await this.client();
    const customer = await prisma.customer.findFirst({
      where: {
        [field]: value,
      },
      select: {
        id: true,
        name: true,
        email: true,
        account: {
          select: {
            password: true,
            acceptedAt: true,
          },
        },
      },
    });

    const customerDtoOrNull: CustomerRepositoryDto | null = !customer
      ? null
      : {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          password: customer.account.password,
          acceptedTerms: customer.account.acceptedAt !== null,
        };

    return customerDtoOrNull;
  }
  async create(entity: CustomerRepositoryDto): Promise<void> {
    const prisma = await this.client();
    await prisma.customer.create({
      data: {
        id: entity.id,
        name: entity.name,
        email: entity.email,
        account: {
          create: {
            password: entity.password,
          },
        },
      },
    });
    return;
  }
}
