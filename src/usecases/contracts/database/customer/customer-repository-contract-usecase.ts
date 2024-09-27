import type { CustomerAggregate } from '@/domain';
import type {
  CreateRepositoryContract,
  FindFieldOrNullRepositoryContract,
} from '@/usecases/contracts/database/repository-contracts-usecase';

export interface CustomerRepositoryContractsUsecase
  extends FindFieldOrNullRepositoryContract<CustomerAggregate>,
    CreateRepositoryContract<CustomerAggregate> {}
