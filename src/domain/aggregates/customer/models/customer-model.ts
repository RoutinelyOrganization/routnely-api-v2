import type { AccountModel } from '@/domain/entities/account/models';

export type CustomerModel = Omit<AccountModel, 'id'> & {
  id?: string;
  idAccount?: string;
  name: string;
  acceptedTerms: boolean;
};
