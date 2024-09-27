/* eslint-disable @typescript-eslint/no-unused-vars */
import { right, type Either } from '@/shared/either';
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
    async create(customer: CustomerRepositoryDto): Promise<Either<Error, void>> {
      return right();
    }
    async findByField<K extends keyof CustomerRepositoryDto>(
      field: K,
      value: CustomerRepositoryDto[K],
    ): Promise<Either<Error, CustomerRepositoryDto | null>> {
      if (dataCustomerRepo[field] !== value) return right(null);
      return right(dataCustomerRepo);
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
