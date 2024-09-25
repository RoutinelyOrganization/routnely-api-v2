import type { ContractDomain } from '@/domain/contracts/contract-domain';
import type { CustomerModel } from '@/domain/entities/customer/models';

export type InputCustomerDto = Omit<CustomerModel, 'id'>;

export type OutputCustomerDto = Promise<void>;

export interface RegisterCustomerContractDomain extends ContractDomain {
  perform(data: InputCustomerDto): OutputCustomerDto;
}
