/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CriptographyContractUsecase } from '@/usecases/contracts/cryptography/cryptography-contract-usecase.ts';
import type {
  CustomerRepositoryContractsUsecase,
  CustomerRepositoryDto,
} from '@/usecases/contracts/database';
import { RegisterCustomerUsecase } from '@/usecases/implementations';
import type { InputRegisterCustomerDto } from '@/usecases/implementations/customer/register/register-customer-dto';

export const data: InputRegisterCustomerDto = {
  name: 'Customer',
  email: 'email@teste.com',
  password: '@Teste123',
  acceptedTerms: true,
};

export const repositoryStub = (): CustomerRepositoryContractsUsecase => {
  class CustomerRepository implements CustomerRepositoryContractsUsecase {
    async findFieldOrNull<K extends keyof CustomerRepositoryDto>(
      field: K,
      value: CustomerRepositoryDto[K],
    ): Promise<CustomerRepositoryDto | null> {
      return null;
    }
    async create(entity: CustomerRepositoryDto): Promise<void> {
      return;
    }
  }

  return new CustomerRepository();
};

export const makeCryptographyStub = (): CriptographyContractUsecase => {
  class Cryptography implements CriptographyContractUsecase {
    async encrypter(password: string): Promise<string> {
      return Promise.resolve('password');
    }
    async compare(password: string, hashValue: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new Cryptography();
};

type SutType = {
  sut: RegisterCustomerUsecase;
  repository: CustomerRepositoryContractsUsecase;
  cryptography: CriptographyContractUsecase;
};
export const makeSutUsecase = (): SutType => {
  const repository = repositoryStub();
  const cryptography = makeCryptographyStub();
  const sut = new RegisterCustomerUsecase(repository, cryptography);
  return {
    sut,
    repository,
    cryptography,
  };
};
