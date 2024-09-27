import type { RegisterCustomerContractDomain } from '@/domain/contracts';
import { makeCustomerRepository } from '@/factories/infra';
import { RegisterCustomerUsecase } from '@/usecases/implementations';

export const makeRegisterCustomerUsecase = (): RegisterCustomerContractDomain => {
  const repository = makeCustomerRepository();
  return new RegisterCustomerUsecase(repository);
};
