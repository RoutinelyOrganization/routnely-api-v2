import type { InputCustomerAggregateModel } from '@/domain/aggregates/customer';
import type { ContractDomain } from '@/domain/contracts/contract-domain';

export type InputRegisterCustomerDto = Omit<
  InputCustomerAggregateModel,
  'id' | 'idAccount' | 'isVerified' | 'acceptedAt'
>;

export type OutputRegisterCustomerDto = Promise<void>;

export interface RegisterCustomerContractDomain extends ContractDomain {
  perform(data: InputRegisterCustomerDto): OutputRegisterCustomerDto;
}
