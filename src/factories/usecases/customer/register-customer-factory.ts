import type { RegisterCustomerContractDomain } from '@/domain/contracts';
import { makeCustomerRepository } from '@/factories/infra';
import { makeCryptography } from '@/factories/infra/criptography/criptography-factory';
import { RegisterCustomerUsecase } from '@/usecases/implementations';

export const makeRegisterCustomerUsecase = (): RegisterCustomerContractDomain => {
  const repository = makeCustomerRepository();
  const cryptography = makeCryptography();
  return new RegisterCustomerUsecase(repository, cryptography);
};
