import { CustomerAggregate } from '@/domain/aggregates/customer';
import { PrismaHelper } from '@/infra/database/prisma/helpers/prisma-helper';
import type {
  CriptographyContractUsecase,
  CustomerRepositoryContractsUsecase,
} from '@/usecases/contracts';
import type { PrismaClient } from '@prisma/client';

export class CustomerRepository implements CustomerRepositoryContractsUsecase {
  constructor(private criptography: CriptographyContractUsecase) {}
  private async client(): Promise<PrismaClient> {
    return await PrismaHelper.getPrisma();
  }

  async findFieldOrNull<K extends keyof CustomerAggregate>(
    field: K,
    value: CustomerAggregate[K] | Partial<CustomerAggregate[K]>,
  ): Promise<CustomerAggregate | null> {
    const prisma = await this.client();
    const customer = await prisma.customer.findFirst({
      where: {
        [field]: value,
      },
      select: {
        id: true,
        name: true,
        acceptedTerms: true,
        account: {
          select: {
            id: true,
            isVerified: true,
            email: true,
            password: true,
            acceptedAt: true,
          },
        },
      },
    });

    const customerAggregateOrNull: CustomerAggregate | null = !customer
      ? null
      : CustomerAggregate.create({
          id: customer.id,
          name: customer.name,
          email: customer.account.email,
          password: this.criptography.decrypter(customer.account.password),
          acceptedTerms: customer.acceptedTerms,
          idAccount: customer.account.id,
          acceptedAt: customer.account.acceptedAt || undefined,
        });

    return customerAggregateOrNull;
  }
  async create(entity: CustomerAggregate): Promise<void> {
    const prisma = await this.client();
    await prisma.customer.create({
      data: {
        id: entity.id,
        name: entity.name,
        acceptedTerms: entity.acceptedTerms,
        account: {
          create: {
            id: entity.account.id,
            email: entity.account.email,
            password: this.criptography.encrypter(entity.account.password),
          },
        },
      },
    });
    return;
  }
}
