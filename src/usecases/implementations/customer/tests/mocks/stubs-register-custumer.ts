/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomerAggregate } from '@/domain/aggregates/customer';
import type { CustomerRepositoryContractsUsecase } from '@/usecases/contracts';
import { RegisterCustomerUsecase } from '@/usecases/implementations';

export const data = {
  name: 'Customer',
  email: 'email@teste.com',
  password: '@Teste123',
  acceptedTerms: true,
};

export const repositoryStub = (): CustomerRepositoryContractsUsecase => {
  class CustomerRepository implements CustomerRepositoryContractsUsecase {
    async findFieldOrNull<K extends keyof CustomerAggregate>(
      field: K,
      value: CustomerAggregate[K],
    ): Promise<CustomerAggregate | null> {
      return null;
    }
    async create(entity: CustomerAggregate): Promise<void> {
      return;
    }
  }

  return new CustomerRepository();
};

type SutType = {
  sut: RegisterCustomerUsecase;
  repository: CustomerRepositoryContractsUsecase;
};
export const makeSutUsecase = (): SutType => {
  const repository = repositoryStub();
  const sut = new RegisterCustomerUsecase(repository);
  return {
    sut,
    repository,
  };
};
