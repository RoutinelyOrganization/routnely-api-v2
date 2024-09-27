import { CustomerRepository } from '@/infra/database/prisma/repositories/customer/customer-repository-infra';
import type { CustomerRepositoryContractsUsecase } from '@/usecases/contracts/database';

export const makeCustomerRepository = (): CustomerRepositoryContractsUsecase => {
  return new CustomerRepository();
};
