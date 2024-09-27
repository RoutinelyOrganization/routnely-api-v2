import type { CustomerModel } from '@/domain/aggregates/customer/models';
import type { ContractDomain } from '@/domain/contracts/contract-domain';

export type InputRegisterCustomerDto = Omit<
  CustomerModel,
  'id' | 'idAccount' | 'isVerified' | 'acceptedAt'
>;

export type OutputRegisterCustomerDto = Promise<void>;

export interface RegisterCustomerContractDomain extends ContractDomain {
  perform(data: InputRegisterCustomerDto): OutputRegisterCustomerDto;
}
