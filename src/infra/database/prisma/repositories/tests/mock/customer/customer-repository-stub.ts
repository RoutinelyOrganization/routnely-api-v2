/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  CustomerRepositoryContractsUsecase,
  CustomerRepositoryDto,
} from '@/usecases/contracts/database';

const dataCustomerRepo: CustomerRepositoryDto = {
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  acceptedTerms: true,
};

const stubCustomerRepository = (): CustomerRepositoryContractsUsecase => {
  class CustomerRepositoryStub implements CustomerRepositoryContractsUsecase {
    async findFieldOrNull<K extends keyof CustomerRepositoryDto>(
      field: K,
      value: CustomerRepositoryDto[K],
    ): Promise<CustomerRepositoryDto | null> {
      return null;
    }
    async create(customer: CustomerRepositoryDto): Promise<void> {
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
