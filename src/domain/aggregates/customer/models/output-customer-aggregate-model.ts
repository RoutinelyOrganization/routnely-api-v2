import type { AccountEntity } from '@/domain/entities/account';

export type OutputCustomerAggregateModel = {
  id: string;
  name: string;
  acceptedTerms: boolean;
  account: AccountEntity;
};
