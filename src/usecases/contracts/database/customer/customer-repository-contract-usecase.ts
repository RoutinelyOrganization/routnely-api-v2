import type {
  CreateRepositoryContract,
  FindByFieldRepositoryContract,
} from '@/usecases/contracts/database/repository-contracts-usecase';

export type CustomerRepositoryDto = {
  id: string;
  name: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
};

export interface CustomerRepositoryContractsUsecase
  extends FindByFieldRepositoryContract<CustomerRepositoryDto>,
    CreateRepositoryContract<CustomerRepositoryDto> {}
