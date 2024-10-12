import type { InputAccountEntityModel } from '@/domain/entities/account';
export type InputCustomerAggregateModel = Omit<InputAccountEntityModel, 'id'> & {
  id?: string;
  idAccount?: string;
  name: string;
  acceptedTerms: boolean;
};
