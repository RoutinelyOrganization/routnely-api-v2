/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomerAggregate } from '@/domain/aggregates/customer';
import type { CustomerRepositoryContractsUsecase } from '@/usecases/contracts/database';

const dataCustomerRepo = {
  name: 'any name',
  email: 'any_email@email.com',
  password: '@Test123',
  acceptedTerms: true,
};

const stubCustomerRepository = (): CustomerRepositoryContractsUsecase => {
  class CustomerRepositoryStub implements CustomerRepositoryContractsUsecase {
    async findFieldOrNull<K extends keyof CustomerAggregate>(
      field: K,
      value: CustomerAggregate[K],
    ): Promise<CustomerAggregate | null> {
      return null;
    }
    async create(customer: CustomerAggregate): Promise<void> {
      return;
    }
  }
  return new CustomerRepositoryStub();
};

export const makeCustomerRepository = () => {
  const data = dataCustomerRepo;
  const stub = stubCustomerRepository();
  return {
    stub,
    data,
  };
};
