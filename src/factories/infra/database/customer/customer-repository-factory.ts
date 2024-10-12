import { makeCryptography } from '@/factories/infra/';
import { CustomerRepository } from '@/infra/database/prisma/repositories/customer/customer-repository-infra';
import type { CustomerRepositoryContractsUsecase } from '@/usecases/contracts/database';

export const makeCustomerRepository = (): CustomerRepositoryContractsUsecase => {
  const criptography = makeCryptography();
  return new CustomerRepository(criptography);
};
