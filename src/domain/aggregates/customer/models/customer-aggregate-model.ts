import type { AccountEntity } from '@/domain/entities/account';

export type CustomerAggregateModel = {
  id: string;
  name: string;
  acceptedTerms: boolean;
  account: AccountEntity;
};
