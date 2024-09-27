import type { ContractDomain } from '@/domain/contracts/contract-domain';
import type { CustomerModel } from '@/domain/entities/customer/models';
import type { Either } from '@/shared/either';

export type InputCustomerDto = Omit<CustomerModel, 'id'>;

export type RegisterCustomerResponseType = Promise<Either<Error, void>>;

export interface RegisterCustomerContractDomain extends ContractDomain {
  perform(data: InputCustomerDto): RegisterCustomerResponseType;
}
